// models/pedido.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cliente = require('./cliente');

const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cliente, key: 'id' } },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pendente' },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

module.exports = Pedido;
