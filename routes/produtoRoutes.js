// routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { authMiddleware } = require('../middleware/auth');

// Listar todos os produtos publicamente
router.get('/listar', produtoController.renderizarListar);

// Lista produtos do vendedor autenticado
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await produtoController.listarPorVendedor(req.session.usuario.id);
    res.render('vendedor/produtos', { produtos });
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.redirect('/');
  }
});

/* --USAR PARA O ADMIN--
// Adicionar produto 
router.get('/adicionar', produtoController.criar);
router.post('/salvar', produtoController.salvar);

// Editar produto
router.get('/editar/:id', produtoController.editar);
router.post('/salvarEdicao', produtoController.salvarEdicao);

// Confirmar e excluir produto
router.get('/confirmarExclusao/:id', produtoController.confirmarExclusao);
router.post('/excluir/:id', produtoController.excluirProduto);

// Processa ação (editar ou excluir)
router.get('/produtos/:action/:id', async (req, res) => {
  const { action, id } = req.params;
  try {
    await produtoController.processarAcao(action, id);
    res.redirect('/vendedor/produtos');
  } catch (err) {
    console.error('Erro ao processar ação:', err);
    res.redirect('/vendedor/produtos');
  }
});
*/

module.exports = router;
