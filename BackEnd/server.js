const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // Allowing all CORS requests for this Express app

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

// Defining a schema for the 'books' collection in the MongoDB database
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

// Creating a model for the 'books' collection based on the defined schema
const bookModel = mongoose.model('dfgdfgdfgdfg5r5645634fggh', bookSchema);

// Handling HTTP DELETE requests to delete a book by ID
app.delete('/api/book/:id', async (req, res) => {
  let book = await bookModel.findByIdAndDelete(req.params.id);
  res.send(book);
});

// Handling HTTP PUT requests to update a book by ID
app.put('/api/book/:id', async (req, res) => {
  let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

// Handling HTTP POST requests to create a new book
app.post('/api/book', (req, res) => {
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
  .then(() => { res.send("Book Created") })
  .catch(() => { res.send("Book NOT Created") });
});

// Handling a root route, sending a simple response
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handling HTTP GET requests to fetch all books
app.get('/api/books', async (req, res) => {
  let books = await bookModel.find({});
  res.json(books);
});

// Handling HTTP GET requests to fetch a book by its identifier
app.get('/api/book/:identifier', async (req, res) => {
  let book = await bookModel.findById(req.params.identifier);
  res.send(book);
});

// Serving the App.js file
app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'app.js'));
});

// Starting the server, listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});