const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 4000;
let jsonParser = bodyParser.json();
const mongoose = require('mongoose');


app.use(express.static('public'));

const userSchema = mongoose.Schema({
  name: {
    firstname: String,
    lastname: String
  },
  created: Date
});

const authorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstname: String,
    lastname: String
  },
  biography: String,
  twitter: String,
  facebook: String,
  profilePictures: Buffer,
  created: {
    type: Date,
    default: Date.now
  }
});

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  summary: String,
  isbn: String,
  thumbnail: Buffer,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  raitings: [
    {
      symmary: String,
      detail: String,
      numberOfStars: Number,
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

let Author = mongoose.model('Author', authorSchema);
let Book = mongoose.model('Book', bookSchema);

const urlMongoDB = 'mongodb+srv://rmtar:rmtar@usersdb-zepwb.mongodb.net/usersdb?retryWrites=true&w=majority';

mongoose.connect(urlMongoDB, {useNewUrlParser: true}, (err) => {
  if(err) {
    throw new Error('*** ERR CONNECT TO DB ***');
  }
  console.log('--- connect succesfully ---');
});










app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');  
});


app.listen(port, () => {
  console.log(`---server start on port ${port}---`);
});
