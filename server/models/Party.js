const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const PartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  time: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    min: 100,
    required: true,
  },
  attendees: {
    type: Number,
    required: true,
    min: 4,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate:{
    type: Date, 
    default: Date.now,
},
});

module.exports = mongoose.model('Party', PartySchema);
