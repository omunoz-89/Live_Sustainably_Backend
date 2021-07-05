const mongoose = require('mongoose');
const { Schema } = mongoose;

// Garden Schema
const gardenSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    plant_id: {
        type: Number,
        required: true,
    },
    image_url: String,
    scientific_name: String,
    description: String,
    sun: String,
    sowing_method: String,
    spacing: String,
    user_id: String
})


const Garden = mongoose.model('Garden', gardenSchema);
module.exports = Garden

