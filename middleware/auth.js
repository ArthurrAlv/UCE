// middleware/auth.js

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  console.log('Verificando autenticação...');
  console.log('Sessão atual:', req.session);
  if (req.session && req.session.usuario) {
    req.user = req.session.usuario;
    console.log('Usuário autenticado:', req.user.tipoUsuario);
    next();
  } else {
    console.log('Usuário não autenticado, redirecionando para login.');
    res.redirect('/auth/login');
  }
};

// Middleware para redirecionamento de usuários autenticados
const redirectIfAuthenticated = (req, res, next) => {
  if (req.session && req.session.usuario) {
    console.log('Usuário autenticado, redirecionando...');
    return redirectAuthenticatedUser(req, res);
  }
  console.log('Usuário não autenticado, permitindo acesso ao login...');
  next();
};

const redirectAuthenticatedUser = (req, res) => {
  console.log('Usuário autenticado(2), redirecionando...');
  const tipoUsuario = req.session.usuario.tipoUsuario; // Corrigido
  if (tipoUsuario === 'cliente') {
    return res.redirect('/produtos/listar'); // Redireciona clientes para a página de listagem de produtos
  } else if (tipoUsuario === 'vendedor') {
    return res.redirect('/vendedor/produtos'); // Redireciona vendedores para a página de produtos do vendedor
  } else if (tipoUsuario === 'admin') {
    return res.redirect('/admin/painel'); // Redireciona admins para o painel administrativo
  } else {
    return res.redirect('/auth/login'); // Redireciona para a página de login se o tipo de usuário for desconhecido
  }
};

module.exports = { authMiddleware, redirectIfAuthenticated, redirectAuthenticatedUser };
