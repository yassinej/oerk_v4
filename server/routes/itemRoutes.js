const mongoose = require('mongoose');
const Authentication = require('../services/authentication');
Item = mongoose.model('item');

module.exports = app => {
	//getting items from DB
	app.get('/api/items', async (req, res) => {
		try {
			const items = await Item.find({});
			if (!items) res.status(401).json({ error: 'No Items found' });
			res.status(200).send(items);
		} catch (e) {
			res.status(400).json({ error: 'Unexpected error', stack: e });
		}
	});
	//Logged Admin can add item
	app.post(
		'/api/items/add',
		Authentication.requireLogin,
		Authentication.requireAdmin,
		async (req, res) => {
			const { item } = req.body;
			//console.log('Item is:', item);
			try {
				const newItem = await Item.create(item);
				if (!newItem) res.status(401).json({ error: 'Creating item failed' });
				res.status(200).json({ message: 'Item created' });
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged Admin can remove item
	app.get(
		'/api/items/:id/del',
		Authentication.requireLogin,
		Authentication.requireAdmin,
		async (req, res) => {
			const id = req.params.id;
			//console.log('Id is:', id);
			try {
				const deletedItem = await Item.remove({ _id: id });
				if (!deletedItem)
					res.status(401).json({ error: 'Removing item failed' });
				res.status(200).json({ message: 'Item removed' });
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged Admin can fetch item
	app.get(
		'/api/items/:id',
		Authentication.requireLogin,
		Authentication.requireAdmin,
		async (req, res) => {
			const id = req.params.id;
			//console.log('Id is:', id);
			try {
				const fetchedItem = await Item.findOne({ _id: id });
				if (!fetchedItem)
					res.status(401).json({ error: 'fetching item failed' });
				res.status(200).json({
					message: 'Item fetched',
					item: fetchedItem
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
};
