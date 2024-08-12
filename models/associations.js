// models/associations.js
const Produto = require('./produto');
const Cliente = require('./cliente');
const Carrinho = require('./carrinho');

// Definindo associações
Produto.hasMany(Carrinho, { foreignKey: 'produto_id' });
Carrinho.belongsTo(Produto, { foreignKey: 'produto_id' });

Cliente.hasMany(Carrinho, { foreignKey: 'cliente_id' });
Carrinho.belongsTo(Cliente, { foreignKey: 'cliente_id' });
