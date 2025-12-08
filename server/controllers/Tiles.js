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

module.exports = {
    getTilesPage,
    getTiles,
};