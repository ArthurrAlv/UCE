// models/index.js
const Cliente = require('./cliente');
const Vendedor = require('./vendedor');
const Admin = require('./admin');
const Produto = require('./produto');
const Carrinho = require('./carrinho');

// Importar e configurar as associações
require('./associations');

module.exports = {
  Cliente,
  Vendedor,
  Admin,
  Produto,
  Carrinho,
};
