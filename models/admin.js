const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
}, { 
  tableName: 'admins',
  timestamps: false, // Se você não precisa de colunas de timestamp (createdAt, updatedAt)
});

// Exemplo de associação (caso haja relação com outros modelos)
// Admin.hasMany(OutroModelo);

module.exports = Admin;
