const UserModel = require('../models/users.model');
const crypto = require('crypto');

hashPassword = (password) => {
	// process plaintext password and store as a unique salt + its hash
	let salt = crypto.randomBytes(16).toString('base64');
	let hash = crypto.createHmac('sha512', salt).update(password).digest('base64');
	return = salt + "$" + hash;
}

exports.insert = (req, res) => {
	req.body.password = hashPassword(req.body.password);
	// default permission level of new user?
	req.body.permissionLevel = 1;
	// creates new user object in database and returns id
	UserModel.createUser(req.body)
		.then((result) => {
			res.status(201).send({id: result._id});
		});
};
exports.list = (req, res) => {
	// default limit to 10 if requested is more than 100 or not specified
	let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
	// default page to 0 if requested is not a valid integer or not specified
	let page = 0;
	if (req.query) {
		if (req.query.page) {
			req.query.page = parseInt(req.query.page);
			page = Number.isInteger(req.query.page) ? req.query.page : 0;
		}
	}
	UserModel.list(limit, page)
		.then((result) => {
			res.status(200).send(result);
		})
		// no reject method?
};
exports.getById = (req, res) => {
	UserModel.findById(req.params.userId).then((result) => {
		res.status(200).send(result);
	});
};
exports.patchById = (req, res) => {
	if (req.body.password) {
		req.body.password = hashPassword(req.body.password);
	}
	UserModel.patchUser(req.params.userId, req.body)
		.then((result) => {
			// why send empty object?
			res.status(204).send({});
		});
};
exports.removeById = (req, res) => {
	// if (req.body.password) {
	// 	req.boby.password = hashPassword(req.body.password);
	// }
	UserModel.removeById(req.params.userId)
		.then((result) => {
			res.status(204).send({});
		});
};