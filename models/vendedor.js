// models/vendedor.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendedor = sequelize.define('Vendedor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  senha: { type: DataTypes.STRING(255), allowNull: false }
}, {
  tableName: 'vendedores',
  timestamps: false
});

module.exports = Vendedor 