// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Garden } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/gardens');
    try {
        const allGardens = await Garden.find({});

        res.json({ gardens: allGardens });
    } catch (error) {
        console.log('Error inside of /api/gardens');
        console.log(error);
        return res.status(400).json({ message: 'Gardens not found. Please try again. test' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for garden based on id
        const garden = await Garden.findById(id);
        res.json({ garden });
    } catch (error) {
        console.log('Error inside of /api/gardens/:id');
        console.log(error);
        return res.status(400).json({ message: 'Garden not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { name, id, scientific_name, description, sun, sowing_method, spacing } = req.body;

    try {
        const newGarden = await Garden.create({ name, id, scientific_name, description, sun, sowing_method, spacing });
        console.log('new garden created', newGarden);
        res.json({ garden: newGarden });
    } catch (error) {
       console.log('Error inside of POST of /api/gardens');
       console.log(error);
       return res.status(400).json({ message: 'Garden was not created. Please try again...' }); 
    }
}

// GET api/gardens/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Gardens endpoint OK!'});
});

// GET -> /api/gardens/
router.get('/', index); 
router.get('/:id', show);
router.post('/', create);


module.exports = router;