const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser());


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Groupr');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
//var kittySchema = mongoose.Schema({
 //   name: String
  //});
  //var Kitten = mongoose.model('Kitten', kittySchema);
  //var silence = new Kitten({ name: 'Silence' });
 // console.log(silence.name); // 'Silence'
  
 // var Kitten = mongoose.model('Kitten', kittySchema);
  //var fluffy = new Kitten({ name: 'fluffy' });
  //fluffy.save(function (err, fluffy) {
  //  if (err) return console.error(err);
  //});
  //Kitten.find(function (err, kittens) {
  //  if (err) return console.error(err);
  //  console.log(kittens);
  //})

  var userSchema = mongoose.Schema({
    email: String
});

var User = mongoose.model('User', userSchema);

var sessionSchema = mongoose.Schema({
    latitude: String,
    longitude: String,
    name: String,
    class: String,
    description: String,
    startTime: String,
    endTime: String,
    locationKey: String,
    owner: String
})

var Session = mongoose.model('Session', sessionSchema);

app.get('/', function (req, res) {
res.send('hello world')
})

app.post('/user/create', function (req, res) {
   // console.log(req)
    console.log(req.body)
    var newUser = new User({email: req.body.email})

    newUser.save(function(err, users) {
        if (err) return console.error(err);
        console.log(users);
        res.send(users);
    });
})

app.post('/session', function (req, res) {
    // console.log(req)
     console.log(req.body)
     var newSession = new Session(
        {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            class: req.body.class,
            description: req.body.description,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            locationKey: req.body.locationKey,
            owner: req.body.owner
        })

    newSession.save(function(err, users) {
        if (err) return console.error(err);
        console.log(users);
        res.send(users);
    })     
 })

 app.get('/session/getinradius', async function (req, res) {
    console.log(req.body)

    const requestLatitude = parseFloat(req.query.latitude);
    const requestLongitude = parseFloat(req.query.longitude);
     
    const sessions = await Session.find();
    console.log(sessions);

    const filteredSessions = sessions.filter((session) => {
        return Math.sqrt(Math.pow(session.latitude - requestLatitude, 2) + Math.pow(session.longitude - requestLongitude, 2)) <= req.query.radius;
    });

    console.log(filteredSessions);

    res.status(200).send(filteredSessions);
 })

app.listen(3000, () => console.log('Example app listening on port 3000!'))
