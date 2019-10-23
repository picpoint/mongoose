const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 4000;
let jsonParser = bodyParser.json();
const mongoose = require('mongoose');


app.use(express.static('public'));

const userSchema = mongoose.Schema({
  user: {
    firstName: String,
    lastName: String
  },
  created: Date
});

const authorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: String,
    lastName: String
  },
  biography: String,
  twitter: String,
  facebook: String,
  prifilePicture: Buffer,
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
      summary: String,
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


let jamieAuthor = new Author ({
  _id: new mongoose.Types.ObjectId(),
  name: {
    firstName: 'Jamie',
    lastName: 'Munro'
  },
  biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and',
  twitter: 'https://twitter.com/endyourif',
  facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
});



jamieAuthor.save((err) => {
  if(err) {
    throw new Error('***ERR TO SAVE AUTHOR***');
  }

  let mvcBook = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
    author: jamieAuthor._id,
    raitings: [{
      summary: 'Gread read'
    }]
  });

  mvcBook.save((err) => {
    if(err) {
      throw new Error('***ERR TO SAVE BOOK MVC***');
    }
  });


  let knockoutBook = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
    author: jamieAuthor._id
  });

  knockoutBook.save((err) => {
    if(err) {
      throw new Error('***ERR TO SAVE BOOK KNOCKOUT***');
    }
  });

});






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
