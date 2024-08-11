// models/produto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Vendedor = require('./vendedor');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: true },
  preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  vendedor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Vendedor, key: 'id' } },
  estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, {
  tableName: 'produtos',
  timestamps: false
});

module.exports = Produto;
