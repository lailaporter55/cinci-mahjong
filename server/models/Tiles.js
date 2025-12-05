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

module.exports = mongoose.model('Tile', TileSchema);