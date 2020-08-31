const mongoose = require('mongoose');

// TODO: retain only schema here, all processing move to seperate file
const UserSchema = new mongoose.Schema({
	name: String,
	username: Number,
	password: String,
	country: String,
	email: String,
	phone: String,
	image: String,
	contacts: [String],
});

module.exports = mongoose.model('User', UserSchema);
