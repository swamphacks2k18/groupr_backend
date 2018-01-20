const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sessionActions = require('./sessions/sessionActions');
const userActions = require('./users/usersActions');
app.use(bodyParser());

const mongoose = require('mongoose');
mongoose.connect('mongodb://sw18:sw18@ds157499.mlab.com:57499/groupr');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// user routes
app.post('/user/create', userActions.createUser);

// session routes
app.post('/session/create', sessionActions.sessionCreate);
app.get('/session/getinradius', sessionActions.getInRadius); 
app.put('/session/join', sessionActions.sessionJoin); 


app.listen(3000, () => console.log('Example app listening on port 3000!'))
