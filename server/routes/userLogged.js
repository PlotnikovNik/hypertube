const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user');

router.get('/', (req, res, next) => {
	if (!req.user){
		res.json({
			isLogged: false,
			infos: {},
			isFetching: true,
		})	
	} else {
		res.json({
			isLogged: true,
			infos: req.user,
			isFetching: true,
		})
	}
})

const checkNewEmail = (newEmail) =>  {
	return new Promise((res, rej) => {
		User.findOne({email: newEmail}, (err, result) => {
			if (err) rej(err);
			if (result) {
				res({ success: false });
			} else {
				res({ success: true })
			}
		})
	});
}

router.get('/getUsers', async (req, res, next) => {
	if (!req.query.value) {
		res.json([]);
	} else {
		User.find({
			$or: [
				{ login: { $regex: ".*" + req.query.value + ".*" } },
				{ lastName: { $regex: ".*" + req.query.value + ".*" } },
				{ firstName: { $regex: ".*" + req.query.value + ".*" } },
				{ login: { $regex: ".*" + req.query.value.charAt(0).toUpperCase() + req.query.value.slice(1) + ".*" } },
				{ lastName: { $regex: ".*" + req.query.value.charAt(0).toUpperCase() + req.query.value.slice(1) + ".*" } },
				{ firstName: { $regex: ".*" + req.query.value.charAt(0).toUpperCase() + req.query.value.slice(1) + ".*" } }
			],
			facebookId: { $exists: false },
			fortytwoId: { $exists: false }
		}, {_id: 0, login: 1, firstName: 1, lastName: 1}, (err, result) => {
			res.json(result);
		});
	}
});

router.get('/getInfoUser', (req, res, next) => {
	const login = req.query.login;
	User.findOne({login: login}, {email: 0}, (err, result) => {
		console.log(result)
		if (err) res.json({success: false, msg: 'database', data: undefined});
		if (result) {
			res.json({success: true, msg: 'User found', data: result});
		} else {
			res.json({success: false, msg: 'User not found', data: undefined});
		}
	});
});

router.post('/update', async (req, res, next) => {
	const key = req.body.key;
	const value = req.body.value;
	if (key === 'email') {
		await checkNewEmail(value)
		.then((response) => {
			if (!response.success) {
				res.json({success: false, msg: 'Email already exists', oldValue: { name: 'email', value: req.user.email } });
			} else {
				const set = {[key]: value};
				User.update({ _id: req.user._id }, {$set: set }, (err, result) => {
					if (err) { 
						res.json({ success: false, msg: 'Database fail' + err });
					} else {
						req.user[key] = value;
						res.json({ success: true, msg: 'User data in db updated' });
					}
				});
			}
		})
		.catch((rejection) => {
			if (rejection) {
				res.json({ success: false, msg: 'Database issue' })
			}
		});
	} else {
		const set = ((key === 'firstName' || key === 'lastName') ? { [key]: value.capitalize() } : {[key]: value});
		User.update({ _id: req.user._id}, {$set: set}, (err, result) => {
			if (err) {
				res.json({ success: false, msg: 'Database fail' + err });
			} else {
				req.user[key] = value.capitalize();
				res.json({ success: true, msg: 'User data in db updated' });
			}
		});
	}
})

module.exports = router;