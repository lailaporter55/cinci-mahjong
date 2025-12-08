const mongoose = require('mongoose');

const OrderScheme = new mongoose.Schema({
    items: {
        product: {type: mongoose.Schema.ObjectId, ref: 'Tile', required: true},
        quantity: {type: Number, required: true, min: 1},
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    customerName:{
        type: String,
        required: true,
        trim: true,
    },
    customerEmail:{
        type: String,
        required: true,
        trim: true,
    },
    orderDate:{
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
}); 

const Order = mongoose.model('Order', OrderScheme);

module.exports = {
    Order,
};