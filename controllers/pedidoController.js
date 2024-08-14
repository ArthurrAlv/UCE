// controllers/pedidoController.js
const Pedido = require('../models/pedido');
const ItemPedido = require('../models/itemPedido');
const Produto = require('../models/produto');
const Cliente = require('../models/cliente');

const pedidoController = {
  criarPedido: async (req, res) => {
    const cliente_id = req.session.usuario.id;
    const { itens } = req.body; // `itens` é um array de { produto_id, quantidade }

    try {
      // Cria o pedido
      const pedido = await Pedido.create({ cliente_id, total: 0 });

      let totalPedido = 0;
      for (const item of itens) {
        const produto = await Produto.findByPk(item.produto_id);
        if (!produto) {
          return res.status(404).send('Produto não encontrado');
        }

        // Calcula o total e cria o item do pedido
        const precoItem = produto.preco * item.quantidade;
        await ItemPedido.create({
          pedido_id: pedido.id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco: produto.preco,
        });

        totalPedido += precoItem;
        produto.estoque -= item.quantidade;
        await produto.save();
      }

      // Atualiza o total do pedido
      pedido.total = totalPedido;
      await pedido.save();

      res.status(201).json(pedido);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  listarPedidosCliente: async (req, res) => {
    console.log('Acessando a página de histórico de pedidos...');
    const cliente_id = req.session.usuario.id;

    try {
        const pedidos = await Pedido.findAll({
            where: { cliente_id },
            include: [{ model: ItemPedido, include: [Produto] }],
        });

        res.render('cliente/historico', { pedidos });
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).send('Erro interno do servidor');
    }
  },

  // processar compra direta
  comprarProdutoDiretamente: async (req, res) => {
    const cliente_id = req.session.usuario.id;
    const { produto_id, quantidade } = req.body;

    try {
      const produto = await Produto.findByPk(produto_id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }

      if (produto.estoque < quantidade) {
        return res.status(400).send('Quantidade solicitada excede o estoque disponível');
      }

      // Criar o pedido
      const pedido = await Pedido.create({ cliente_id, total: produto.preco * quantidade });

      // Criar o item do pedido
      await ItemPedido.create({
        pedido_id: pedido.id,
        produto_id,
        quantidade,
        preco: produto.preco,
      });

      // Atualizar o estoque
      produto.estoque -= quantidade;
      await produto.save();

      res.redirect('/pedido/historico');
    } catch (error) {
      console.error('Erro ao processar a compra direta:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

};

module.exports = pedidoController;
