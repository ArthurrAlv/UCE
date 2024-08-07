// models/index.js
const Cliente = require('./cliente');
const Vendedor = require('./vendedor');
const Admin = require('./admin');
const Produto = require('./produto');

module.exports = {
  Cliente,
  Vendedor,
  Admin,
  Produto,
};
