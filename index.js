const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Groupr');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var kittySchema = mongoose.Schema({
    name: String
  });
  var Kitten = mongoose.model('Kitten', kittySchema);
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  
  var Kitten = mongoose.model('Kitten', kittySchema);
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
  });
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })


  app.get('/', function (req, res) {
    res.send('hello world')
  })

app.listen(3000, () => console.log('Example app listening on port 3000!'))
