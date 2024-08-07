// authController.js
const Cliente = require('../models/cliente');
const Vendedor = require('../models/vendedor');
const bcrypt = require('bcrypt');

const sanitize = (input) => input.trim();

const authController = {
  renderizarLogin: (req, res) => {
    res.render('auth/login', { error: false });
  },

  efetuarLogin: async (req, res) => {
    const { email, senha, tipoUsuario } = req.body;
    console.log(`Tentando login com email: ${email} e tipo de usuário: ${tipoUsuario}`);
    const sanitizedEmail = sanitize(email);
    const sanitizedSenha = sanitize(senha);

    try {
      let usuario = null;
      if (tipoUsuario === 'cliente') {
        usuario = await Cliente.findOne({ where: { email: sanitizedEmail } });
      } else if (tipoUsuario === 'vendedor') {
        usuario = await Vendedor.findOne({ where: { email: sanitizedEmail } });
      } else {
        return res.status(400).send('Tipo de usuário inválido.');
      }

      if (usuario && bcrypt.compareSync(sanitizedSenha, usuario.senha)) {
        req.session.usuario = { id: usuario.id, tipoUsuario }; // Corrigido
        // Verifica o tipo de usuário e redireciona para a rota correta
        if (tipoUsuario === 'cliente') {
          return res.redirect('/produtos/listar'); // rota para clientes
        } else if (tipoUsuario === 'vendedor') {
          return res.redirect('/vendedor/produtos'); // rota para vendedores
        }
      } else {
        return res.render('auth/login', { error: true });
      }
    } catch (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.render('auth/login', { error: true });
    }
  },

  renderizarRegistro: (req, res) => {
    res.render('auth/registro');
  },

  efetuarRegistro: async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    const sanitizedNome = sanitize(nome);
    const sanitizedEmail = sanitize(email);
    const hashedSenha = bcrypt.hashSync(sanitize(senha), 10);

    try {
      if (tipo === 'cliente') {
        await Cliente.create({ nome: sanitizedNome, email: sanitizedEmail, senha: hashedSenha });
      } else if (tipo === 'vendedor') {
        await Vendedor.create({ nome: sanitizedNome, email: sanitizedEmail, senha: hashedSenha });
      } else {
        return res.status(400).send('Tipo de usuário inválido.');
      }
      res.redirect('/auth/login');
    } catch (error) {
      console.error('Erro ao criar o registro:', error);
      res.status(500).send('Erro ao criar o registro.');
    }
  },

  efetuarLogout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send('Erro ao finalizar sessão.');
      }
      res.redirect('/auth/login');
    });
  }
};

module.exports = authController;
