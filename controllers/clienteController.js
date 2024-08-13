// controllers/clienteController.js
const Cliente = require('../models/cliente');
const sanitize = (input) => input.trim();

const clienteController = {
  // Renderiza a página de perfil
  renderizarPerfil: async (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    const cliente = await Cliente.findByPk(req.user.id);
    res.render('cliente/perfil', { cliente });
  },

  // Renderiza a página de editar perfil
  renderizarEditarPerfil: async (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    const cliente = await Cliente.findByPk(req.user.id);
    res.render('cliente/editarPerfil', { cliente });
  },

  // Procesa a edição de perfil
  efetuarEditarPerfil: async (req, res) => {
    const { nome, email } = req.body;
    await Cliente.update({ nome: sanitize(nome), email: sanitize(email) }, { where: { id: req.user.id } });
    res.redirect('/cliente/perfil');
  },

  // Rendediza a página de histórico de compras
  renderizarHistorico: (req, res) => {
    if (req.user.tipoUsuario !== 'cliente') {
      return res.redirect('/');
    }
    res.render('cliente/historico');
  },
};

module.exports = clienteController;
