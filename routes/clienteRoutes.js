// routes/clienteRoutes.js

const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { authMiddleware } = require('../middleware/auth');

// Rota para renderizar o perfil do cliente
router.get('/perfil', authMiddleware, clienteController.renderizarPerfil);

// Rota para renderizar o formulário de edição do perfil
router.get('/editarPerfil', authMiddleware, clienteController.renderizarEditarPerfil);
// Rota para processar a edição do perfil
router.post('/editarPerfil', authMiddleware, clienteController.efetuarEditarPerfil);


// Rota para renderizar o histórico do cliente
router.get('/historico', authMiddleware, clienteController.renderizarHistorico);

module.exports = router;

