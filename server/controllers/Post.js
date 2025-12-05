const { get } = require('underscore');
const models = require('../models');

const { Post } = models;

const getPost = (req, res) => res.render('post');

const createPost = async (req, res) => {
  const {name, title, photo, stars, review} = req.body;
    if (!name || !title || !photo || !stars || !review) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try{
        await post.save(); 
        return res.status(201).json({ message: 'Post created successfully!' });
    } catch(err){
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({ error: 'Post already exists.' });
        }
        return res.status(500).json({ error: 'An error occurred while creating post!' });
    }
  }; 

const getPosts = async (req, res) => {
    try{
        const query = { owner: req.session.account._id };
        const docs = await Post.find(query).select('name title photo stars review').lean().exec();
        return res.json({ posts: docs });
    } catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error retrieving posts!' });
    }
};

module.exports = {
  getPost,
  createPost,
  getPosts,
};


