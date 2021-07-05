// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Garden } = require('../models');
const { User } = require('../models');


// Controllers
const index = async (req, res) => {
    console.log('inside of /api/gardens');
    console.log(req.params)
    try {
        const allGardens = await Garden.find({user_id: req.params.id});
        return res.json({ gardens: allGardens });
    } catch (error) {
        console.log('Error inside of /api/gardens');
        console.log(error);
        return res.status(400).json({ message: 'Gardens not found. Please try again. test' });
    }
}

const show = async (req, res) => {
    const { plant_id } = req.params;
    try {
        const garden = await Garden.find({_id: plant_id});
        console.log(garden)
        res.json({ garden });
    } catch (error) {
        console.log('Error inside of /api/gardens/:plant_id');
        console.log(error);
        return res.status(400).json({ message: 'Garden not found. Try again...' });
    }
}

const create = async (req, res) => {
    console.log(req.body)
    const { name, plant_id, scientific_name, description, image_url, sowing_method, spacing, sun, user_id } = req.body;

    try {
        
        const newGarden = await Garden.create({ name, plant_id, scientific_name, description, image_url, sowing_method, spacing, sun, user_id });
        const user = await User.findById(user_id)
        console.log(user)
        user.garden.push(newGarden._id)
        user.save()
        console.log('new garden created', newGarden);
        res.json({ garden: newGarden });

    } catch (error) {
       console.log('Error inside of POST of /api/gardens');
       console.log(error);
       return res.status(400).json({ message: 'Garden was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
    console.log(req.body);
    const { name, id, scientific_name, description, sowing_method, spacing, sun} = req.body;
    try {
        const result = await Garden.findByIdAndUpdate(id, {name: name, scientific_name: scientific_name, description: description, sun: sun, sowing_method: sowing_method, spacing: spacing})
        console.log(result)
        return res.status(200).json({ message: 'Plant was updated successfully.'})
    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Plant was not updated. Please try again....'})
        
    }

}



const deletePlant = async (req, res) => {
    const {id} = req.params;
    console.log(req.params)
    try {
        const result = await Garden.findByIdAndDelete(id)
        console.log(result)
        return res.status(200).json({ message: 'Plant was deleted successfully.'})
    } catch (error) {
        console.log('Error inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Plant was not deleted. Please try again....'})
        
    }
}

// GET api/gardens/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Gardens endpoint OK!'});
});

// GET -> /api/gardens/
router.get('/user/:id', index); 
router.get('/:plant_id',show);
router.put('/:id', update);
router.post('/', create);
router.delete('/:id', deletePlant);


module.exports = router;