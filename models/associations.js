const Produto = require('./produto');
const Cliente = require('./cliente');
const Vendedor = require('./vendedor');
const Carrinho = require('./carrinho');
const Pedido = require('./pedido');
const ItemPedido = require('./itemPedido');

// Carrinho
Produto.hasMany(Carrinho, { foreignKey: 'produto_id' });
Carrinho.belongsTo(Produto, { foreignKey: 'produto_id' });

Cliente.hasMany(Carrinho, { foreignKey: 'cliente_id' });
Carrinho.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Pedido
Cliente.hasMany(Pedido, { foreignKey: 'cliente_id' });
Pedido.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Nova associação entre Pedido e Vendedor
Vendedor.hasMany(Pedido, { foreignKey: 'vendedor_id' });
Pedido.belongsTo(Vendedor, { foreignKey: 'vendedor_id' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedido_id' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedido_id' });

Produto.hasMany(ItemPedido, { foreignKey: 'produto_id' });
ItemPedido.belongsTo(Produto, { foreignKey: 'produto_id' });
