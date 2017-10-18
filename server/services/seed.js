const mongoose = require('mongoose');
Item = mongoose.model('item');
Review = mongoose.model('review');
Backpack = mongoose.model('backpack');

const itemBackup = [];
const items = [
	{
		name: 'Item 1',
		category: 'Category 1',
		description:
			"Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
		imageURL: './src/assets/backpack.png',
		availability: 5,
		price: 5
	},
	{
		name: 'Item 2',
		category: 'Category 3',
		description:
			"Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
		imageURL: './src/assets/backpack.png',
		availability: 10,
		price: 5
	},
	{
		name: 'Item 3',
		category: 'Category 2',
		description:
			"Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
		imageURL: './src/assets/backpack.png',
		availability: 4,
		price: 10
	},
	{
		name: 'Item 4',
		category: 'Category 6',
		description:
			"Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
		imageURL: './src/assets/backpack.png',
		availability: 5,
		price: 15
	},
	{
		name: 'Item 5',
		category: 'Category 3',
		description:
			"Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
		imageURL: './src/assets/backpack.png',
		availability: 8,
		price: 1
	},
	{
		name: 'Item 6',
		category: 'Category 1',
		description:
			"Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.",
		imageURL: './src/assets/backpack.png',
		availability: 0,
		price: 2
	}
];

function seedDB() {
	//Remove all items
	Item.remove({}, err => {
		if (err) {
			//console.log(err);
		}
		//console.log('All items removed !');
		//add a few items
		items.forEach(seed => {
			Item.create(seed, (err, item) => {
				if (err) {
					//console.log(err);
				} else {
					itemBackup.push(item.id);
					//console.log('Item added');
					Review.create(
						{
							user_id: '59df7a4ce75d7378308b766f',
							item_id: item._id,
							content: 'Best item ever',
							stars: 5
						},
						(err, review) => {
							if (err) {
								//console.log(err);
							} else {
								item.reviews.push(review);
								item.save();
								//console.log('Created new review');
							}
						}
					);
				}
			});
		});
		//console.log(itemBackup);
	});
	const backpacks = [
		{
			user_id: '59df7a4ce75d7378308b766f',
			items: [
				{
					itemId: itemBackup[0],
					itemQuantity: 1
				},
				{
					itemId: itemBackup[1],
					itemQuantity: 1
				},
				{
					itemId: itemBackup[2],
					itemQuantity: 1
				},
				{
					itemId: itemBackup[3],
					itemQuantity: 1
				}
			],
			rentalStart: Date.now(),
			rentalDuration: 5,
			totalPrice: 50
		},
		{
			user_id: '59df7a4ce75d7378308b766f',
			items: [
				{
					itemId: itemBackup[0],
					itemQuantity: 2
				},
				{
					itemId: itemBackup[1],
					itemQuantity: 5
				},
				{
					itemId: itemBackup[2],
					itemQuantity: 1
				},
				{
					itemId: itemBackup[3],
					itemQuantity: 2
				}
			],
			rentalStart: Date.now(),
			rentalDuration: 10,
			totalPrice: 300,
			checkedOut: true,
			checkedOutDate: Date.now()
		}
	];
	Backpack.remove({}, err => {
		if (err) //console.log(err);
		//console.log('all backpacks removed!!');
		backpacks.forEach(seed => {
			Backpack.create(seed, (err, backpack) => {
				if (err) //console.log(err);
				else //console.log('Backpack added');
			});
		});
	});
}

module.exports = seedDB;
