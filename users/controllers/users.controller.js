const UserModel = require('../models/users.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
	// process plaintext password and store as a unique salt + its hash
	let salt = crypto.randomBytes(16).toString('base64');
	let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
	req.body.password = salt + "$" + hash;
	// default permission level of new user?
	req.body.permissionLevel = 1;
	// creates new user object in database and returns id
	UserModel.createUser(req.body)
		.then((result) => {
			res.status(201).send({id: result._id});
		});
};