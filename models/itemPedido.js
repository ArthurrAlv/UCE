// models/itemPedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pedido = require('./pedido');
const Produto = require('./produto');

const ItemPedido = sequelize.define('ItemPedido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  pedido_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Pedido, key: 'id' } },
  produto_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Produto, key: 'id' } },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: 'itens_pedido',
  timestamps: true,
});

module.exports = ItemPedido;
