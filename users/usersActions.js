const User = require('./usersModel.js');
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

module.exports = {
	createUser: async function (req, res) {
	   // console.log(req)
		console.log(req.body)
		
		const password = req.body.password;
		console.log(password);
		hash.update(password);
		let hashedPassword = hash.digest('hex');
		console.log(hashedPassword);
		
	    var newUser = new User({
	    	email: req.body.email,
	    	name: req.body.name,
	    	password: hashedPassword
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
	 }
}