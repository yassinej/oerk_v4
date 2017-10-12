const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = mongoose.Schema({
	name: String,
	category: String,
	description: String,
	imageURL: String,
	availability: Number,
	price: Number,
	reviews: [
		{
			review_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'review'
			}
		}
	]
});

mongoose.model('item', itemSchema);
