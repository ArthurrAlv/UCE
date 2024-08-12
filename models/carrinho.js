// models/carrinho.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Produto = require('./produto');
const Cliente = require('./cliente');

const Carrinho = sequelize.define('Carrinho', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cliente, key: 'id' } },
  produto_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produto, key: 'id' } },
  quantidade: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: 'carrinhos',
  timestamps: true, // timestamps para createdAt e updatedAt
});

module.exports = Carrinho;
