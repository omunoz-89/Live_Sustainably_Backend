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


// GET -> /api/plants/
router.get('/', index); 


module.exports = router;