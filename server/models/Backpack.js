const mongoose = require('mongoose');

const { Schema } = mongoose;

const backpackSchema = mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	items: [
		{
			itemId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'item'
			},
			itemQuantity: Number
		}
	],
	rentalStart: Date,
	rentalDuration: { type: Number, default: 0 },
	totalPrice: { type: Number, default: 0 },
	checkedOut: { type: Boolean, default: false },
	checkedOutDate: Date
});

mongoose.model('backpack', backpackSchema);
