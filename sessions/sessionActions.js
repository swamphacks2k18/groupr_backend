const Session = require('./sessionModel');

module.exports = {
	sessionCreate: async function (req, res) {
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

	    try {
	    	await newSession.save();
	    	res.status(200).send();
	    } catch(err) {
	    	res.send(err);
	    }
 	},
 	getInRadius: async function (req, res) {
	    console.log(req.body)

	    const requestLatitude = parseFloat(req.query.latitude);
	    const requestLongitude = parseFloat(req.query.longitude);

	    const sessions = await Session.find();
	    console.log(sessions);

			/*

			______ _    _ _____   _____ ______   ______      _____ _______ ____  _____
		 |  ____| |  | |  __ \ / ____|  ____| |  ____/\   / ____|__   __/ __ \|  __ \
		 | |__  | |  | | |  | | |  __| |__    | |__ /  \ | |       | | | |  | | |__) |
		 |  __| | |  | | |  | | | |_ |  __|   |  __/ /\ \| |       | | | |  | |  _  /
		 | |    | |__| | |__| | |__| | |____  | | / ____ \ |____   | | | |__| | | \ \
		 |_|     \____/|_____/ \_____|______| |_|/_/    \_\_____|  |_|  \____/|_|  \_\

				what is it
			*/

	    let fudgeFactor = 1.05;
	    const filteredSessions = sessions.filter((session) => {
	        return Math.sqrt(Math.pow(session.latitude - requestLatitude, 2) + Math.pow(session.longitude - requestLongitude, 2)) <= req.query.radius * fudgeFactor;
	    });

	    console.log(filteredSessions);

	    res.status(200).send(filteredSessions);
	},

	sessionCancel: async function (req, res) {
		const owner = req.body.owner;
		const name = req.body.name;

		try {
			const sessions = await Session.remove({owner: owner, name: name});
			console.log(sessions);

			res.status(200).send({"Records deleted": sessions.n});
		} catch (err) {
			if (err.code) res.status(err.code).send(err);
			else res.status(500).send(err);
		}
	},

	sessionJoin: async function (req, res) {
		const sessionId = req.body.sessionId;
		const joiningUser = req.body.email;

		try {
	    	const session = await Session.findById(req.body.sessionId);

	        if (session.members.includes(joiningUser)) {
	            throw ErrBadReq('Already signed up.');
	        }

	        session.members.push(joiningUser);

	        await session.save();
	        res.status(200).send(session);
    	} catch(err) {
    		if (err.code) res.status(err.code).send(err);
    		else res.status(500).send(err);
    	}
	}
 }

 const ErrBadReq = (message) => {
 	return {
 		code: 400,
 		message: message
 	}
 }
