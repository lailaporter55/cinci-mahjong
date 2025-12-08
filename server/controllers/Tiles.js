const models = require('../models');

const { Tiles } = models;

const getTilesPage = (req, res) => res.render('tiles');

const getTiles = async (req, res) => {
    try{
        const docs = await Tiles.find({}).select('name description price imageUrl').lean().exec();
        return res.json({ tiles: docs });
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving tiles!' });
    }
};


const createOrder = async (req, res) => {
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
        const order = new Tiles(orderData);
        await order.save(); 
        return res.status(201).json({ message: 'Order created successfully!', orderId: order.id});
    } catch(err){
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({ error: 'Order already exists.' });
        }
    };
}

const getOrders = async (req, res) => {
    try{
        const query = { owner: req.session.account._id };
        const docs = await Tiles.find(query).select('items total customerName customerEmail orderDate').lean().exec();
        return res.json({ orders: docs });
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving orders!' });
    }
};

module.exports = {
    getTilesPage,
    getTiles,
    createOrder,
    getOrders,
};