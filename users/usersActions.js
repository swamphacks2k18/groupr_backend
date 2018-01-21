const User = require('./usersModel.js');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

module.exports = {
	createUser: async function (req, res) {
		console.log('tw', req.body)
		
		const password = req.body.password;
		// const hashedPassword = hash.update(password).digest('hex');

	    const newUser = new User({
	    	email: req.body.email,
	    	name: req.body.name,
	    	password: password
	    })

	    try {
		    const user = await newUser.save();
		    res.status(200).send(user);
		} catch(err) {
			res.status(500).send(err);
		}
	},

	getUser: async function (req, res) {		 
		 let user = await User.find({"email":req.query.email});
		console.log(req.query.email);
		console.log(user);
		 try {
			 res.status(200).send(user);
		 } catch(err) {
			 res.status(500).send(err);
		 }
	 },

	 /*login: async function (req, res) {
		console.log(req.body)
		
		const password = req.body.password;
		let hashedPassword = hash.update(password).digest('hex');

		let user = await User.find({"email": req.query.email, "password":hashedPassword})

		if (user.length >= 1) {
			res.status(200)
		}
	 }*/
}