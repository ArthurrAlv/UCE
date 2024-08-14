const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cliente = require('./cliente');
const Vendedor = require('./vendedor');

const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Cliente, key: 'id' } },
  vendedor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Vendedor, key: 'id' } }, // Novo campo
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Pendente' },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
  tableName: 'pedidos',
  timestamps: true,
});

// Estabelecendo as associações
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Vendedor, { foreignKey: 'vendedor_id' });

module.exports = Pedido;
