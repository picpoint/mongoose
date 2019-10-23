const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.port || 4000;
let jsonParser = bodyParser.json();
const mongoose = require('mongoose');

app.use(express.static('public'));

const provisionerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  companyName: String,
  adress: [
    {
      city: String,
      region: String,
      postIndex: Number,
      telephone: Number
    }
  ],
  logo: Buffer,
  created: {
    type: Date,
    default: Date.now
  }  
});

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  metall: String,
  metallSample: Number,
  pictOfProduct: Buffer,
  proviss: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provissioner'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

let Provissioner = mongoose.model('Provissioner', provisionerSchema);
let Product = mongoose.model('Product', productSchema);


let alkor = new Provissioner({
  _id: new mongoose.Types.ObjectId(),
  companyName: 'Alkor',
  adress: [{
    city: 'Moscow',
    region: 'Moscow region',
    postIndex: 355000,
    telephone: 8800555700
  }]
});

alkor.save((err) => {
  if(err) {
    throw new Error('***ERR TO SAVE ALKOR***');
  } else {
    console.log('ALKOR SAVE TO SUCCESSFULLY');
  }
});



let ring = new Product({
  _id: new mongoose.Types.ObjectId(),
  title: 'RING',
  metall: 'silver',
  metallSample: 925,
  proviss: alkor._id
});

ring.save((err) => {
  if(err) {
    throw new Error('***ERR TO SAVE RING***');
  } else {
    console.log('RING SAVE TO SUCCESSFULLY');
  }
});

let pendent = new Product({
  _id: new mongoose.Types.ObjectId(),
  title: 'PENDENT',
  metall: 'GOLD',
  metallSample: 585,
  proviss: alkor._id
});

pendent.save((err) => {
  if (err) {
    throw new Error('***ERR TO SAVE PENDENT***');
  } else {
    console.log('PENDENT SUCCESSFULLY');
  }
});


Product.findByIdAndUpdate('5db0a9b05f32a43eb7d080ac', 
{metall: 'SILVER/GOLD'},
  (err, product) => {
    if(err) {
      throw new Error('***ERR TO UPDATE PRODUCT***');
    } else {
      console.log(product);
    }
  }
);




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
