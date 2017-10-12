const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	item_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'item'
	},
	content: String,
	stars: Number,
	reviewDate: { type: Date, default: Date.now }
});

mongoose.model('review', reviewSchema);
