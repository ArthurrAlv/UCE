// routes/carrinhoRoutes.js
const express = require('express');
const router = express.Router();
const carrinhoController = require('../controllers/carrinhoController');
const { authMiddleware } = require('../middleware/auth');

// Visualizar o carrinho de compras
router.get('/', authMiddleware, carrinhoController.visualizarCarrinho);

// Adicionar um produto ao carrinho
router.post('/adicionar', authMiddleware, carrinhoController.adicionarAoCarrinho);

// Remover um produto do carrinho
router.get('/remover/:produtoId', authMiddleware, carrinhoController.removerDoCarrinho);

// Atualizar a quantidade de um produto no carrinho
router.post('/atualizar/:produtoId', authMiddleware, carrinhoController.atualizarQuantidade);

module.exports = router;
