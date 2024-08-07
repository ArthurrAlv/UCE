// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/auth');

// Rota para renderizar a página de login
router.get('/login', redirectIfAuthenticated, authController.renderizarLogin);

// Rota para processar o formulário de login
router.post('/login', redirectIfAuthenticated, authController.efetuarLogin);

// Rota para renderizar a página de registro
router.get('/registro', redirectIfAuthenticated, authController.renderizarRegistro);

// Rota para processar o formulário de registro
router.post('/registro', redirectIfAuthenticated, authController.efetuarRegistro);

// Rota para logout
router.get('/logout', authController.efetuarLogout);

module.exports = router;
