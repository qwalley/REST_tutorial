const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	permissionLevel: Number
});
// custom getter for id virtual
userSchema.virtual('id').get(function () {
	return this._id.toHexString();
});
// make virtual fields serialised
userSchema.set('toJSON', {
	virtuals: true
});
// custom schema method
userSchema.findById = function (callback) {
	return this.model('Users').find({id: this.id}, callback);
};
// compile User model
const User = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
	// create new document
	const user = new User(userData);
	// save and return document
	return user.save();
};
exports.findById = (id) => {
	return User.findById(id)
		.then((result) => {
			result = result.toJSON();
			delete result._id;
			delete result.__v;
			return result;
		});
};
exports.list = (perPage, page) => {
	// page begins at 0
	return new Promise((resolve, reject) => {
		User.find()
			.limit(perPage)
			.skip(perPage * page)
			.exec(function (err, users) {
				if (err) {
					reject(err);
				}
				else {
					resolve(users);
				}
			})
	});
};
exports.patchUser = (id, userData) => {
	return new Promise((resolve, reject) => {
		User.findById(id, function (err, user) {
			// exit if retreiveing user data failed
			if (err) reject(err);
			// update user data fields
			for (let i in userData) {
				user[i] = userData[i];
			}
			user.save(function (err, updatedUser) {
				if (err) return reject(err);
				resolve(updatedUser);
			});
		});
	})
};
exports.removeById = (id) => {
	return new Promise((resolve, reject) => {
		User.remove({_id: userId}, (err) => {
			if (err) {
				reject(err);
			}
			else {
				// returning a null
				resolve(err);
			}
		})
	})
}
