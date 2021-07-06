require('dotenv').config();
const mongoose = require('mongoose');

let connectionString = "";
if (process.env.NODE_ENV === "production") {
  connectionString = process.env.DB_URL;
} else {
  connectionString = process.env.MONGO_URI;
}
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});


const db = mongoose.connection;

//Setup event fro db to print connection
db.once('open', () => {
    console.log(`Connect to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', err => console.log (`Database error`, err));

//Import all models

const User = require('./User');
const Book = require('./Book');
const Garden = require('./Garden');



//Export all models from file
module.exports = {
    User,
    Book,
    Garden
}