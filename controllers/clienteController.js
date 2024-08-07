// controllers/clienteController.js
const Cliente = require('../models/cliente');
const sanitize = (input) => input.trim();

const clienteController = {
  renderizarPerfil: async (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    const cliente = await Cliente.findByPk(req.user.id);
    res.render('cliente/perfil', { cliente });
  },

  efetuarEditarPerfil: async (req, res) => {
    const { nome, email } = req.body;
    await Cliente.update({ nome: sanitize(nome), email: sanitize(email) }, { where: { id: req.user.id } });
    res.redirect('/cliente/perfil');
  },

  renderizarCarrinho: (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    res.render('cliente/carrinho');
  },

  renderizarHistorico: (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    res.render('cliente/historico');
  },

  renderizarEditarPerfil: async (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    const cliente = await Cliente.findByPk(req.user.id);
    res.render('cliente/editarPerfil', { cliente });
  },
};

module.exports = clienteController;
