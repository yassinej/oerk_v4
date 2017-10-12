const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = mongoose.Schema({
	googleId: String,
	googleToken: String,
	googleEmail: String,
	name: String,
	avatar: String
});

mongoose.model('users', userSchema);
