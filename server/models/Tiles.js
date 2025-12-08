const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const TileSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        set: setName,
    },
    price:{
        type: Number,
        required: true,
    },
    img:{
        type: String,
        required: true,
    }
});

const Product = mongoose.model('Tile', TileSchema);

module.exports = {
    Product,
};