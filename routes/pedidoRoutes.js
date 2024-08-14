// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { authMiddleware } = require('../middleware/auth');

// Listar histórico de pedidos do cliente
router.get('/historico', authMiddleware, pedidoController.listarPedidosCliente);

// Criação de um novo pedido
router.post('/criar', authMiddleware, pedidoController.criarPedido);

// Compra direta de um produto
router.post('/comprar', authMiddleware, pedidoController.comprarProdutoDiretamente);

module.exports = router;
