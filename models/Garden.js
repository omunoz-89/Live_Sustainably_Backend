const mongoose = require('mongoose');
const { Schema } = mongoose;

// Garden Schema
const gardenSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    scientific_name: String,
    description: String,
    sun: String,
    sowing_method: String,
    spacing: String,
})


const Garden = mongoose.model('Garden', gardenSchema);
module.exports = Garden
