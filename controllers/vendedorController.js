// controllers/vendedorController.js
const Vendedor = require('../models/vendedor');
const Produto = require('../models/produto');

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
    const { id } = req.params;
    const { nome, descricao, preco, estoque } = req.body;
    try {
      await Produto.update({
        nome: sanitize(nome),
        descricao: sanitize(descricao),
        preco: parseFloat(preco),
        estoque: parseInt(estoque)
      }, { where: { id, vendedor_id: req.user.id } });
      res.redirect('/vendedor/produtos');
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      res.redirect(`/vendedor/editarProduto/${id}`);
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
  }
  };

module.exports = vendedorController;
