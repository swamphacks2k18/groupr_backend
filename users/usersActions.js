const User = require('./usersModel.js');

module.exports = {
	createUser: async function (req, res) {
	   // console.log(req)
		console.log(req.body)
		
		console.log(User);
	    var newUser = new User({email: req.body.email})

	    try {
		    const user = await newUser.save();
		    res.status(200).send(user);
		} catch(err) {
			res.status(500).send(err);
		}
	}
}