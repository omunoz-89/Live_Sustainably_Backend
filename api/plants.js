// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios')



// Models
const { Plant } = require('../models');

// Controllers
const index = async (req, res) => {
    axios.get(`https://www.growstuff.org/crops.json`)
    .then(function (response) {
        res.send(response.data) 
    })
};

const show = async (req, res) => {
    const { id } = (req.params)
    console.log('test')
    axios.get(`https://www.growstuff.org/crops/${id}.json`)
    .then(function (response) {
        res.send(response.data) 
    })
}

const search = async (req, res) => {
    const { id } = (req.params)
    axios.get(`https://www.growstuff.org/crops/${id}.json`)
    .then(function (response) {
        res.send(response.data) 
        console.log(response.data)
    })
};

// GET -> /api/plants/
router.get('/', index);
router.get('/search/:id', search);
router.get('/:id', passport.authenticate('jwt', { session: false }), show); 



module.exports = router;