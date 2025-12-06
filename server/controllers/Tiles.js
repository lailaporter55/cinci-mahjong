const models = require('../models');

const { Tiles } = models;

const tiles = JSON.parse(flushSync.readFileSync(tilesPath, 'utf8'));

let orders = []; 

const getTiles = (req, res) => {
  res.json(products);
};

const createOrder = (req, res) => {
    const order = {
        id: orders.length + 1,
        items: req.body.items,
        total: req.body.totalPrice,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        orderDate: new Date(),
    };
    orders.push(order);
    res.status(201).json({ message: 'Order created successfully!', orderId: order.id });
};

const getOrders = (req, res) => {
    res.json(orders);
};

module.exports = {
    getTiles,
    createOrder,
    getOrders,
};