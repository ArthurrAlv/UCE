const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendedor = sequelize.define('Vendedor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
}, { 
  tableName: 'vendedores',
  timestamps: false, // Se você não precisa de colunas de timestamp (createdAt, updatedAt)
});

// Exemplo de associação (caso haja relação com outros modelos)
// Vendedor.hasMany(OutroModelo);

module.exports = Vendedor;
