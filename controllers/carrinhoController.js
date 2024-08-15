// controllers/carrinhoController.js
const Produto = require('../models/produto');
const Carrinho = require('../models/carrinho');
const Pedido = require('../models/pedido');
const ItemPedido = require('../models/itemPedido');

const carrinhoController = {
  // Adiciona um produto ao carrinho
  adicionarAoCarrinho: async (req, res) => {
    const { produto_id, quantidade } = req.body;
    const quantidadeInt = parseInt(quantidade, 10) || 1;
    const cliente_id = req.session.usuario.id; // Obtém o ID do cliente da sessão

    try {
      // Verifica se o produto existe e obtém sua quantidade em estoque
      const produto = await Produto.findByPk(produto_id);
      if (!produto) {
        return res.status(404).send('Produto não encontrado');
      }

      // Verifica se a quantidade solicitada está disponível em estoque
      if (produto.estoque < quantidadeInt) {
        return res.status(400).send('Quantidade solicitada excede o estoque disponível');
      }

      // Verifica se o item já está no carrinho do cliente
      let carrinhoItem = await Carrinho.findOne({
        where: {
          produto_id: produto_id,
          cliente_id: cliente_id,
        }
      });

      if (carrinhoItem) {
        // Verifica se a quantidade total após a adição excede o estoque
        if (produto.estoque < carrinhoItem.quantidade + quantidadeInt) {
          return res.status(400).send('Quantidade total no carrinho excede o estoque disponível');
        }
        // Atualiza a quantidade se o item já estiver no carrinho
        console.log('Atualizando quantidade do produto no carrinho');
        carrinhoItem.quantidade += quantidadeInt;
        await carrinhoItem.save();
      } else {
        // Adiciona um novo item ao carrinho
        await Carrinho.create({
          produto_id: produto_id,
          cliente_id: cliente_id,
          quantidade: quantidadeInt,
        });
        console.log('Produto adicionado ao carrinho');
      }

      // Atualiza o estoque do produto
      produto.estoque -= quantidadeInt;
      await produto.save();

      res.redirect('/carrinho'); // Redireciona para a página do carrinho
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  // Renderiza o carrinho de compras
  visualizarCarrinho: async (req, res) => {
    const cliente_id = req.session.usuario.id; // Obtém o ID do cliente da sessão

    try {
      // Buscar todos os itens do carrinho do cliente
      const carrinhoItems = await Carrinho.findAll({
        where: { cliente_id },
        include: [{
          model: Produto,  // Certifique-se de que o relacionamento entre Carrinho e Produto está definido no modelo Carrinho
          attributes: ['id', 'nome', 'preco']  // Inclua apenas os atributos necessários
        }]
      });

      // Formata os itens para a visualização
      const carrinho = carrinhoItems.map(item => {
        return {
          id: item.produto_id,
          nome: item.Produto.nome,
          preco: item.Produto.preco,
          quantidade: item.quantidade,
        };
      });
      
      res.render('cliente/carrinho', { carrinho });
    } catch (error) {
      console.error('Erro ao visualizar o carrinho:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  // Remove um produto do carrinho
  removerDoCarrinho: async (req, res) => {
    const { produtoId } = req.params;
    const cliente_id = req.session.usuario.id; // Obtém o ID do cliente da sessão

    try {
      // Obtém o item do carrinho antes de remover
      const carrinhoItem = await Carrinho.findOne({
        where: {
          produto_id: produtoId,
          cliente_id: cliente_id,
        }
      });

      if (carrinhoItem) {
        // Atualiza o estoque do produto
        const produto = await Produto.findByPk(produtoId);
        if (produto) {
          produto.estoque += carrinhoItem.quantidade;
          await produto.save();
        }

        // Remove o item do carrinho no banco de dados
        await carrinhoItem.destroy();
      }

      res.redirect('/carrinho');
    } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  // Atualiza a quantidade de um produto no carrinho
  atualizarQuantidade: async (req, res) => {
    const { produtoId } = req.params;
    const novaQuantidade = parseInt(req.body.quantidade);
    const cliente_id = req.session.usuario.id;

    try {
        const carrinhoItem = await Carrinho.findOne({
            where: {
                produto_id: produtoId,
                cliente_id: cliente_id,
            }
        });

        if (carrinhoItem) {
            const produto = await Produto.findByPk(produtoId);
            if (!produto) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            const diferenca = novaQuantidade - carrinhoItem.quantidade;
            if (produto.estoque < diferenca) {
                return res.status(400).json({ error: 'Quantidade solicitada excede o estoque disponível' });
            }

            produto.estoque -= diferenca;
            await produto.save();

            carrinhoItem.quantidade = novaQuantidade;
            await carrinhoItem.save();

            return res.json({ success: true });
        } else {
            return res.status(404).json({ error: 'Item não encontrado no carrinho' });
        }
    } catch (error) {
        console.error('Erro ao atualizar quantidade no carrinho:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  // Renderiza a página de finalização da compra
  exibirFinalizacao: async (req, res) => {
    const cliente_id = req.session.usuario.id;

    try {
      // Obter todos os itens do carrinho do cliente
      const carrinhoItems = await Carrinho.findAll({
        where: { cliente_id },
        include: [{ model: Produto }]
      });

      if (carrinhoItems.length === 0) {
        return res.redirect('/carrinho'); // Redireciona para o carrinho se estiver vazio
      }

      // Calcular o total do pedido
      let totalPedido = 0;
      const carrinho = carrinhoItems.map(item => {
        totalPedido += item.Produto.preco * item.quantidade;
        return {
          id: item.produto_id,
          nome: item.Produto.nome,
          preco: item.Produto.preco,
          quantidade: item.quantidade,
          subtotal: item.Produto.preco * item.quantidade
        };
      });

      res.render('cliente/finalizarCompra', { carrinho, totalPedido });
    } catch (error) {
      console.error('Erro ao exibir a finalização da compra:', error);
      res.status(500).send('Erro interno do servidor');
    }
  },

  finalizarCompra: async (req, res) => {
    const cliente_id = req.session.usuario.id;

    try {
        // Obter todos os itens do carrinho do cliente
        const carrinhoItems = await Carrinho.findAll({
            where: { cliente_id },
            include: [{ model: Produto }]
        });

        if (carrinhoItems.length === 0) {
            return res.status(400).send('Seu carrinho está vazio.');
        }

        // Agrupar os itens do carrinho por vendedor_id
        const carrinhoPorVendedor = {};
        carrinhoItems.forEach(item => {
            const vendedorId = item.Produto.vendedor_id;
            if (!carrinhoPorVendedor[vendedorId]) {
                carrinhoPorVendedor[vendedorId] = [];
            }
            carrinhoPorVendedor[vendedorId].push(item);
        });

        // Criar um pedido separado para cada vendedor
        for (const vendedorId in carrinhoPorVendedor) {
            let totalPedido = 0;

            // Criar o pedido para o vendedor atual
            const pedido = await Pedido.create({
                cliente_id,
                vendedor_id: vendedorId, // Associar o pedido ao vendedor correto
                total: 0 // Atualizaremos o total após calcular
            });

            // Criar os itens do pedido e calcular o total
            for (const item of carrinhoPorVendedor[vendedorId]) {
                const precoItem = item.Produto.preco * item.quantidade;

                await ItemPedido.create({
                    pedido_id: pedido.id,
                    produto_id: item.produto_id,
                    quantidade: item.quantidade,
                    preco: item.Produto.preco,
                });

                totalPedido += precoItem;

                // Atualizar o estoque do produto
                item.Produto.estoque -= item.quantidade;
                await item.Produto.save();
            }

            // Atualizar o total do pedido
            pedido.total = totalPedido;
            await pedido.save();
        }

        // Limpar o carrinho do cliente
        await Carrinho.destroy({
            where: { cliente_id }
        });

        res.redirect('/pedido/historico'); // Redireciona para a página de histórico de pedidos ou uma página de sucesso
    } catch (error) {
        console.error('Erro ao finalizar a compra:', error);
        res.status(500).send('Erro interno do servidor');
    }
},

};

module.exports = carrinhoController;