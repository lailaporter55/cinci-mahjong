const mongoose = require('mongoose');
const _ = require('underscore');

const TileSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    img:{
        type: String,
        requir, ed: true,
    }
});

const OrderScheme = new mongoose.Schema({
    items: [
        {
            product: {type: mongoose.Schema.ObjectId, ref: 'Tile', required: true},
            quantity: {type: Number, required: true, min: 1},
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    orderDate:{
        type: Date,
        default: Date.now,
    },
}); 

const Product = mongoose.model('Tile', TileSchema);
const Order = mongoose.model('Order', OrderScheme);

module.exports = {
    Product,
    Order,
};