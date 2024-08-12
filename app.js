// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // Importando o sequelize
const app = express();

dotenv.config();

// Configuração da sessão
app.use(session({
  secret: 'segredo', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use((req, res, next) => {
  res.locals.session = req.session; // Torna a sessão disponível em todas as views
  next();
});

// Configuração do Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importar e usar as rotas
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const vendedorRoutes = require('./routes/vendedorRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');

// Rota raiz que redireciona para /auth/login
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Registro das rotas
app.use('/auth', authRoutes);
app.use('/cliente', clienteRoutes);
app.use('/vendedor', vendedorRoutes);
app.use('/produtos', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);

// Importar e definir associações
require('./models/associations');

/* SE EU PRECISAR EU USO
// Configuração do middleware para desabilitar o cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
*/

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Sincronização do Sequelize (opcional, útil durante o desenvolvimento)
sequelize.sync({ force: false }) // Use { force: true } para reiniciar tabelas a cada execução (cuidado!) // Use { alter: true } para ajustar mudanças
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });