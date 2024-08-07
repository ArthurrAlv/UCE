const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT, allowNull: false },
  preco: { type: DataTypes.FLOAT, allowNull: false },
  estoque: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  vendedor_id: { type: DataTypes.INTEGER, allowNull: false }
}, { 
  tableName: 'produtos',
  timestamps: false, // Se você não precisa de colunas de timestamp (createdAt, updatedAt)
});

module.exports = Produto;
