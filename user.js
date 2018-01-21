const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/Groupr');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = mongoose.Schema({
	name: String,
    email: String,
    password: String,
    activeSessions: [{type: String}]

});

var User = mongoose.model('User', userSchema);

app.post('/user/create', function (req, res) {
   // console.log(req)
    console.log(req.body)
    var newUser = new User(
    	{
    		email: req.body.email,
    		name: req.body.name,
    		password: req.body.password,
    		activeSessions: req.body.activeSessions
    	})

    newUser.save(function(err, users) {
        if (err) return console.error(err);
        console.log(users);
        res.send(users);
    });
})

app.put('user/login', async function (req,res) {
	console.log(req.body);

	const reqUser = req.body;
	const users = await User.find();
	console.log(users);

	const filteredUsers = users.filter((user) => {
		return (user.email === reqUser.email);
	}) 

	console.log(filteredUsers);

	res.status(200).send(filteredUsers);
}

app.get('users', async function(req,res) {
	const users = await User.find();

	const listOfUsers = users.map(u => u.name);

	console.log(listOfUsers);

})

var User = mongoose.model('User', userSchema);