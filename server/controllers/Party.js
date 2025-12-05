const models = require('../models');

const { Party } = models;

const getParty = (req, res) => res.render('party');

const createParty = async (req, res) => {
  const { name, time, attendees } = req.body;

  const price = attendees * 20; // price changes based on how many people are attending

  if (!name || !time || !price || !attendees) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const booking = new Party({
    name,
    time,
    attendees,
    price,
    owner: req.session.account._id,
  });
  try {
    await booking.save();
    return res.status(201).json({ message: 'Booking created successfully!' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Party already exists.' });
    }
    return res.status(500).json({ error: 'An error occurred while creating booking!' });
  }
};

const getParties = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Party.find(query).select('name time attendees price').lean().exec();
    return res.json({ parties: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving parties!' });
  }
};

module.exports = {
  getParty,
  createParty,
  getParties,
};


