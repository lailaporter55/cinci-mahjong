const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String, //URL to photo
    required: true,
  },
  review: {
    type: String,
    required: true,
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

module.exports = mongoose.model('Post', PostSchema);
