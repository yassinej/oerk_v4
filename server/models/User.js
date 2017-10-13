const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = mongoose.Schema({
	name: String,
	googleId: String,
	googleToken: String,
	googleEmail: String,
	facebookId: String,
	facebookToken: String,
	avatar: String,
	isAdmin: { type: Boolean, default: false }
});

mongoose.model('users', userSchema);
