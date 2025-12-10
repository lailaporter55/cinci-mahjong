const models = require('../models');

const { Order } = models;


const checkout = async (req, res) => {
    if(!req.body.items || !req.bod.totalPrice || !req.body.customerName || !req.body.customerEmail){
        return res.status(400).json({ error: 'All fields are required!' });
    }
    const orderData = {
        items: req.body.items,
        totalPrice: req.body.totalPrice,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        orderDate: new Date(),
        owner: req.session.account._id,
    };
    try{
        const order = new Order(orderData);
        await order.save(); 
        return res.status(201).json({ message: 'Order created successfully!', orderId: order.id});
    } catch(err){
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({ error: 'Order already exists.' });
        }
        return res.status(500).json({ error: 'An error occurred while creating order!' });
    };
};

const getCart = async (req, res) => {
    try{
        const docs = await Order.find({}).select('items totalPrice customerName customerEmail orderDate').lean().exec();
        return res.json({ cart: docs });
    }catch (err){
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving cart!' });
    }
};

const getOrders = async (req, res) => {
    try{
        const query = { owner: req.session.account._id };
        const docs = await Order.find(query).select('items total customerName customerEmail orderDate').lean().exec();
        return res.json({ orders: docs });
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving orders!' });
    }
};


module.exports = {
    checkout,
    getCart,
    getOrders,
};