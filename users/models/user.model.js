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
// compile User model
const User = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
	// create new document
	const user = new User(userData);
	// save and return document
	return user.save();
}