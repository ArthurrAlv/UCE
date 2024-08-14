// routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { authMiddleware } = require('../middleware/auth');

// Criação de um novo pedido
router.post('/criar', authMiddleware, pedidoController.criarPedido);

// Listar histórico de pedidos do cliente
router.get('/', authMiddleware, pedidoController.listarPedidosCliente);

module.exports = router;
