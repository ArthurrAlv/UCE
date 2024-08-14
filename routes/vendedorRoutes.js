// routes/vendedorRoutes.js
const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedorController');
const { authMiddleware } = require('../middleware/auth');

// Rota para renderizar o perfil do vendedor
router.get('/perfil', authMiddleware, vendedorController.perfil);

// Rota para renderizar o formulário de edição do perfil
router.get('/editarPerfil', authMiddleware, vendedorController.renderizarEditarPerfil);
// Rota para processar a edição do perfil
router.post('/editarPerfil', authMiddleware, vendedorController.editarPerfil);

// Rota para renderizar a página de adicionar produto
router.get('/adicionarProduto', authMiddleware, vendedorController.renderizarAdicionarProduto);
// Rota para processar a adição de um produto
router.post('/adicionarProduto', authMiddleware, vendedorController.efetuarAdicionarProduto);

// Rota para renderizar o formulário de edição do produto
router.get('/editarProduto/:id', authMiddleware, vendedorController.renderizarEditarProduto);
// Rota para processar a edição do produto
router.post('/editarProduto/:id', authMiddleware, vendedorController.efetuarEditarProduto);

// Rota para processar a exclusão do produto
router.post('/excluirProduto/:id', authMiddleware, vendedorController.efetuarExcluirProduto);

// Página para o vendedor gerenciar pedidos
router.get('/pedidos', authMiddleware, vendedorController.listarPedidos);

// Aceitar um pedido
router.post('/pedidos/aceitar/:pedidoId', authMiddleware, vendedorController.aceitarPedido);

// Finalizar um pedido
router.post('/pedidos/finalizar/:pedidoId', authMiddleware, vendedorController.finalizarPedido);    

// Rota para listar produtos do vendedor
router.get('/produtos', authMiddleware, vendedorController.listarProdutos);

module.exports = router;
