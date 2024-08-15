// controllers/vendedorController.js
const Vendedor = require('../models/vendedor');
const Produto = require('../models/produto');
const Pedido = require('../models/pedido');
const ItemPedido = require('../models/itemPedido'); 
const { Op } = require('sequelize');


// Função para sanitizar entradas
const sanitize = (input) => input.trim();

const vendedorController = {
  // Renderiza a página de perfil do vendedor
  perfil: async (req, res) => {
    if (req.user.tipoUsuario !== 'vendedor') {
      return res.redirect('/');
    }
    try {
      const vendedor = await Vendedor.findByPk(req.user.id);
      res.render('vendedor/perfil', { vendedor });
    } catch (err) {
      console.error('Erro ao buscar perfil do vendedor:', err);
      res.redirect('/');
    }
  },

  // Renderiza a página de edição do perfil do vendedor
  renderizarEditarPerfil: async (req, res) => {
    if (req.user.tipoUsuario !== 'vendedor') {
      return res.redirect('/');
    }
    try {
      const vendedor = await Vendedor.findByPk(req.user.id);
      res.render('vendedor/editarPerfil', { vendedor });
    } catch (err) {
      console.error('Erro ao buscar perfil para edição:', err);
      res.redirect('/vendedor/perfil');
    }
  },

  // Atualiza as informações do perfil do vendedor
  editarPerfil: async (req, res) => {
    const { nome, email } = req.body;
    try {
      await Vendedor.update({ nome: sanitize(nome), email: sanitize(email) }, { where: { id: req.user.id } });
      res.redirect('/vendedor/perfil');
    } catch (err) {
      console.error('Erro ao atualizar perfil do vendedor:', err);
      res.redirect('/vendedor/perfil');
    }
  },

  // Renderiza a página para adicionar um produto
  renderizarAdicionarProduto: (req, res) => {
    if (req.user.tipoUsuario !== 'vendedor') {
      return res.redirect('/');
    }
    res.render('vendedor/adicionarProduto', {
      session: req.session // Passando a sessão para o template
    });
  },

  // Adiciona um novo produto
  efetuarAdicionarProduto: async (req, res) => {
    const { nome, descricao, preco, estoque } = req.body;
    try {
      await Produto.create({
        nome: sanitize(nome),
        descricao: sanitize(descricao),
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        vendedor_id: req.user.id
      });
      console.log('Produto "', nome, '" adicionado por vendedor: ', req.user.id)
      res.redirect('/vendedor/produtos');
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      res.redirect('/vendedor/adicionarProduto');
    }
  },

  // Lista os produtos do vendedor
  listarProdutos: async (req, res) => {
    if (req.user.tipoUsuario !== 'vendedor') {
      console.log('retornando ao login');
      return res.redirect('/');
    }
    try {
      const produtos = await Produto.findAll({ where: { vendedor_id: req.user.id } });
      res.render('vendedor/produtos', { 
        produtos, 
        session: req.session 
      });
    } catch (err) {
      console.error('Erro ao listar produtos do vendedor:', err);
      res.redirect('/vendedor/perfil');
    }
  },

  // renderiza a página de edição de produto
  renderizarEditarProduto: async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await Produto.findOne({ where: { id, vendedor_id: req.user.id } });
      if (produto) {
        res.render('vendedor/editarProduto', { produto, session: req.session });
      } else {
        res.redirect('/vendedor/produtos');
      }
    } catch (err) {
      console.error('Erro ao buscar produto para edição:', err);
      res.redirect('/vendedor/produtos');
    }
  },

  // Processa a edição de um produto
  efetuarEditarProduto: async (req, res) => {
    const { id } = req.params;  // ID do produto
    const { nome, descricao, preco, estoque } = req.body;  // Dados do formulário
    try {
      await Produto.update({
        nome: sanitize(nome),
        descricao: sanitize(descricao),
        preco: parseFloat(preco),
        estoque: parseInt(estoque)
      }, { where: { id, vendedor_id: req.user.id } });
      res.redirect('/vendedor/produtos');  // Redireciona para a lista de produtos
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      res.redirect(`/vendedor/editarProduto/${id}`);  // Redireciona de volta para a página de edição em caso de erro
    }
  },

  // Processa a exclusão de um produto
  efetuarExcluirProduto: async (req, res) => {
    const { id } = req.params;
    try {
      await Produto.destroy({ where: { id, vendedor_id: req.user.id } });
      res.redirect('/vendedor/produtos');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      res.redirect('/vendedor/produtos');
    }
  },

  // listar pedidos dos clientes
  listarPedidos: async (req, res) => {
    const vendedorId = req.session.usuario.id;

    try {
      // Obtém os pedidos que têm itens associados ao vendedor atual
      const pedidos = await Pedido.findAll({
        include: [{
          model: ItemPedido,
          include: [{
            model: Produto,
            where: { vendedor_id: vendedorId }
          }],
        }],
        where: {
          status: {
            [Op.in]: ['Pendente', 'aceito']
          }
        }
      });

      // Filtrar pedidos que não têm itens para o vendedor atual
      const pedidosFiltrados = pedidos.filter(pedido => pedido.ItemPedidos.length > 0);

      res.render('vendedor/pedidos', { pedidos: pedidosFiltrados, vendedorId });
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  aceitarPedido: async (req, res) => {
    const { pedidoId } = req.params;
    const vendedor_id = req.session.usuario.id;

    try {
      const pedido = await Pedido.findByPk(pedidoId);
      if (!pedido) {
        return res.status(404).send('Pedido não encontrado');
      }

      // Atualiza o status do pedido para "aceito"
      pedido.status = 'aceito';
      pedido.vendedor_id = vendedor_id;
      await pedido.save();

      res.redirect('/vendedor/pedidos');
    } catch (error) {
      console.error('Erro ao aceitar pedido:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  finalizarPedido: async (req, res) => {
    const { pedidoId } = req.params;
  
    try {
      const pedido = await Pedido.findByPk(pedidoId, {
        include: [{ model: ItemPedido, include: [Produto] }]
      });
      if (!pedido) {
        return res.status(404).send('Pedido não encontrado');
      }
  
      // Atualiza o status do pedido para "finalizado"
      pedido.status = 'finalizado';
      await pedido.save();
  
      // Atualiza o estoque dos produtos
      for (const item of pedido.ItemPedidos) {
        const produto = await Produto.findByPk(item.produto_id);
        if (produto) {
          produto.estoque = Math.max(produto.estoque - item.quantidade, 0); // Evita que o estoque fique negativo
          await produto.save();
        }
      }
  
      res.redirect('/vendedor/pedidos');
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },  
};

module.exports = vendedorController;
