// controllers/carrinhoController.js
const Produto = require('../models/produto');
const Carrinho = require('../models/carrinho');

// Função auxiliar para encontrar um produto no carrinho
function encontrarProdutoNoCarrinho(carrinho, produtoId) {
  return carrinho.find(item => item.produto_id === parseInt(produtoId, 10));
}

const carrinhoController = {
  // Renderiza o carrinho de compras
  visualizarCarrinho: (req, res) => {
    const carrinho = req.session.carrinho || [];
    res.render('cliente/carrinho', { carrinho });
  },

  // Adiciona um produto ao carrinho
  adicionarAoCarrinho: async (req, res) => {
    if (!req.session.usuario || req.session.usuario.tipoUsuario !== 'cliente') {
      return res.redirect('/auth/aviso-autenticacao');
    }
  
    const { produto_id, quantidade } = req.body;
    const quantidadeInt = parseInt(quantidade, 10) || 1;
    const cliente_id = req.session.usuario.id; // Obtém o ID do cliente da sessão
  
    try {
      // Verifica se o produto existe
      const produto = await Produto.findByPk(produto_id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }
  
      // Verifica se o item já está no carrinho do cliente
      let carrinhoItem = await Carrinho.findOne({
        where: {
          produto_id: produto_id,
          cliente_id: cliente_id,
        }
      });
  
      if (carrinhoItem) {
        // Atualiza a quantidade se o item já estiver no carrinho
        console.log('atualizando quantidade do produto no carrinho')
        carrinhoItem.quantidade += quantidadeInt;
        await carrinhoItem.save();
      } else {
        // Adiciona um novo item ao carrinho
        await Carrinho.create({
          produto_id: produto_id,
          cliente_id: cliente_id,
          quantidade: quantidadeInt,
        });
        console.log('produto adicionado ao carrinho')
      }
  
      res.redirect('/carrinho'); // Redireciona para a página do carrinho
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  // Remove um produto do carrinho
  removerDoCarrinho: (req, res) => {
    const { produtoId } = req.params;
    const carrinho = req.session.carrinho || [];

    req.session.carrinho = carrinho.filter(item => item.id !== parseInt(produtoId));

    res.redirect('/cliente/carrinho');
  },

  // Atualiza a quantidade de um produto no carrinho
  atualizarQuantidade: (req, res) => {
    const { produtoId } = req.params;
    const novaQuantidade = parseInt(req.body.quantidade);

    if (!req.session.carrinho) {
      return res.redirect('/cliente/carrinho');
    }

    const item = encontrarProdutoNoCarrinho(req.session.carrinho, produtoId);

    if (item && novaQuantidade > 0) {
      item.quantidade = novaQuantidade;
    } else {
      // Se a quantidade for zero ou negativa, remova o item
      req.session.carrinho = req.session.carrinho.filter(item => item.id !== parseInt(produtoId));
    }

    res.redirect('/cliente/carrinho');
  },
};

module.exports = carrinhoController;
