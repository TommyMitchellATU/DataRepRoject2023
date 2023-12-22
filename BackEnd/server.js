const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle headers for CORS and allow certain HTTP methods and headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Importing body-parser middleware for parsing incoming request bodies
const bodyParser = require("body-parser");

// Configuring body-parser to handle URL-encoded data and JSON data
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

// Connecting to a MongoDB database using Mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://g00400162:Tuesday@cluster0.aklr9hh.mongodb.net/?retryWrites=true&w=majority');
  // This connects to a MongoDB database using the Mongoose library
}

// Defining a schema for the 'places' collection in the MongoDB database
const placeSchema = new mongoose.Schema({
  location: String,
});

const locationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

// Creating a model for the 'places' collection based on the defined schema
const placeModel = mongoose.model('Place', placeSchema);

// Handling HTTP POST requests to create a new place
app.post('/api/place', async (req, res) => {
  try {
    let place = await placeModel.create({
      location: req.body.location,
    });
    res.send(place);
  } catch (error) {
    res.status(500).send("Error adding place");
  }
});

// Handling HTTP GET requests to fetch all places
app.get('/api/places', async (req, res) => {
  try {
    let places = await placeModel.find({});
    res.json(places);
  } catch (error) {
    res.status(500).send("Error fetching places");
  }
});

// Handling HTTP DELETE requests to delete a book by ID
app.delete('/api/book/:id', async (req, res) => {
  try {
    let book = await bookModel.findByIdAndDelete(req.params.id);
    res.send(book);
  } catch (error) {
    res.status(500).send("Error deleting book");
  }
});

// Handling HTTP PUT requests to update a book by ID
app.put('/api/book/:id', async (req, res) => {
  try {
    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(book);
  } catch (error) {
    res.status(500).send("Error updating book");
  }
});

// Handling HTTP GET requests to fetch a book by its identifier
app.get('/api/book/:identifier', async (req, res) => {
  try {
    let book = await bookModel.findById(req.params.identifier);
    res.send(book);
  } catch (error) {
    res.status(500).send("Error fetching book");
  }
});

app.get('/', (req, res) => {
  res.send('');
});

// Serving the App.js file
app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'app.js'));
});

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Starting the server, listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});