const models = require('../models');

const { Post } = models;


const getPost = (req, res) => res.render('post');

const createPost = async (req, res) => {
    if(!req.body.name || !req.body.title || !req.body.photo || !req.body.stars || !req.body.review){
        return res.status(400).json({ error: 'All fields are required!' });
    }
    const postData = {
        name: req.body.name,
        title: req.body.title,
        photo: req.body.photo,
        stars: req.body.stars,
        review: req.body.review,
        owner: req.session.account._id,
    };

    try{
        const post = new Post(postData);
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


