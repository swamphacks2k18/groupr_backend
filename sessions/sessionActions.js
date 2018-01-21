const Session = require('./sessionModel');
const User = require('../users/usersModel');

module.exports = {
	sessionCreate: async function (req, res) {
	    // console.log(req)
	     var newSession = new Session(
	        {
	            latitude: req.body.latitude,
	            longitude: req.body.longitude,
	            name: req.body.name,
	            class: req.body.class,
	            description: req.body.description,
	            startTime: Date.now(),
	            endTime: Date.now(),
	            locationKey: req.body.locationKey,
	            owner: req.body.owner
	        })

	    try {
	    	const resp = await newSession.save();
	    	res.status(200).send(resp);
	    } catch(err) {
	    	res.send(err);
	    }
 	},
 	getInRadius: async function (req, res) {

	    const requestLatitude = parseFloat(req.query.latitude);
	    const requestLongitude = parseFloat(req.query.longitude);

	    const sessions = await Session.find();

			/*

		  ______ _    _ _____   _____ ______   ______      _____ _______ ____  _____
		 |  ____| |  | |  __ \ / ____|  ____| |  ____/\   / ____|__   __/ __ \|  __ \
		 | |__  | |  | | |  | | |  __| |__    | |__ /  \ | |       | | | |  | | |__) |
		 |  __| | |  | | |  | | | |_ |  __|   |  __/ /\ \| |       | | | |  | |  _  /
		 | |    | |__| | |__| | |__| | |____  | | / ____ \ |____   | | | |__| | | \ \
		 |_|     \____/|_____/ \_____|______| |_|/_/    \_\_____|  |_|  \____/|_|  \_\

				~~~~~~~~~~~~~~~~~~~~~~~~~~what is it~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			*/

	    let fudgeFactor = 1.05;
	    const filteredSessions = sessions.filter((session) => {
	        return Math.sqrt(Math.pow(session.latitude - requestLatitude, 2) + Math.pow(session.longitude - requestLongitude, 2)) <= req.query.radius * fudgeFactor;
	    });


	    res.status(200).send({ localSessions: filteredSessions });
	},

	sessionCancel: async function (req, res) {
		const id = req.body.id

		try {
			const sessions = await Session.findbyIdandRemove(id);

			res.status(200).send({"Records deleted": sessions.n});
		} catch (err) {
			if (err.code) res.status(err.code).send(err);
			else res.status(500).send(err);
		}
	},

	sessionJoin: async function (req, res) {
		const sessionId = req.body.sessionId;
		const userId = req.body.userId;


		try {
	    	const [session, user] = await Promise.all([Session.findById(sessionId), User.findById(userId).populate('activeSessions').exec()]);

	        session.members.push(userId);
	        console.log('tw join', userId, user)
	        user.activeSessions.push(session._id);

	        await session.save();
	        await user.save();
	        res.status(200).send({ sessions: user.activeSessions });
    	} catch(err) {
			console.log('tw join err', err);
				res.status(500).send(err);
    	}
	},

	sessionView: async function (req, res) {
		try {
			const sessions = await Session.find();

			const filteredSessions = sessions.filter((session) => {
				return session.members.includes(req.query.id)
			});

			res.status(200).send({ sessions: filteredSessions });
		}
		catch (err) {
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
