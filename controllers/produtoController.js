// controllers/produtoController.js
const Produto = require('../models/produto');

// Função para sanitizar inputs
const sanitize = (input) => input.trim();

const produtoController = {
  // Renderiza o formulário para criar um novo produto
  criar: async (req, res) => {
    res.render('vendedor/adicionarProduto');
  },

  /*
  // Salva um novo produto no banco de dados --USAR PARA O ADMIN--
  salvar: async (req, res) => {
    const { nome, descricao, preco } = req.body;
    try {
      await Produto.create({
        nome: sanitize(nome),
        descricao: sanitize(descricao),
        preco: parseFloat(sanitize(preco)),
        vendedor_id: req.session.usuario.id, 
      });
      res.redirect('/vendedor/produtos');
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      res.redirect('/vendedor/adicionar');
    }
  },
  */

  // Renderiza o formulário de edição de produto
  editar: async (req, res) => {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) {
        return res.redirect('/vendedor/produtos');
      }
      res.render('vendedor/editarProduto', { produto });
    } catch (err) {
      console.error('Erro ao editar produto:', err);
      res.redirect('/vendedor/produtos');
    }
  },

  // Salva as alterações feitas no produto
  salvarEdicao: async (req, res) => {
    const { id, nome, descricao, preco } = req.body;
    try {
      await Produto.update(
        {
          nome: sanitize(nome),
          descricao: sanitize(descricao),
          preco: parseFloat(sanitize(preco)),

        },
        { where: { id: sanitize(id) } }
      );
      res.redirect('/vendedor/produtos');
    } catch (err) {
      console.error('Erro ao salvar edição:', err);
      res.redirect(`/vendedor/editar/${id}`);
    }
  },

  // Renderiza a página de confirmação de exclusão do produto
  confirmarExclusao: async (req, res) => {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) {
        return res.redirect('/vendedor/produtos');
      }
      res.render('vendedor/confirmarExclusao', { produto });
    } catch (err) {
      console.error('Erro ao confirmar exclusão:', err);
      res.redirect('/vendedor/produtos');
    }
  },

  // Exclui um produto do banco de dados
  excluirProduto: async (req, res) => {
    try {
      await Produto.destroy({ where: { id: req.params.id } });
      res.redirect('/vendedor/produtos');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      res.redirect('/vendedor/produtos');
    }
  },

  // Renderiza a lista de todos os produtos
  renderizarListar: async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      // Garantir que preco é um número
      produtos.forEach(produto => {
        if (typeof produto.preco !== 'number' || isNaN(produto.preco)) {
          produto.preco = parseFloat(produto.preco) || 0; // Converte para número ou define como 0
        }
      });
      res.render('produtos/listar', { 
        produtos, 
        session: req.session 
      });
    } catch (error) {
      console.error('Erro ao renderizar a lista de produtos:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  // Lista todos os produtos
  listar: async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      res.render('produtos/listar', { produtos, session: req.session });
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  // Lista produtos específicos de um vendedor
  listarPorVendedor: async (vendedorId) => {
    try {
      return await Produto.findAll({ where: { vendedor_id: vendedorId } });
    } catch (err) {
      console.error('Erro ao listar produtos por vendedor:', err);
      throw err;
    }
  },

  // Processa ações em produtos (como excluir)
  processarAcao: async (action, id) => {
    try {
      if (action === 'excluir') {
        await Produto.destroy({ where: { id } });
      }
      // Adicionar outras ações, se necessário
    } catch (err) {
      console.error('Erro ao processar ação:', err);
      throw err;
    }
  },
};

module.exports = produtoController;
