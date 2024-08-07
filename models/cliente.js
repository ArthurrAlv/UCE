// models/cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
}, { 
  tableName: 'clientes',
  timestamps: false, // Se você não precisa de colunas de timestamp (createdAt, updatedAt)
});

module.exports = Cliente;
