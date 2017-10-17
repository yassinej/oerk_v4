const mongoose = require('mongoose');
const Authentication = require('../services/authentication');
Backpack = mongoose.model('backpack');

module.exports = app => {
	//getting backpacks from DB
	app.get(
		'/api/backpacks',
		Authentication.requireLogin,
		Authentication.requireAdmin,
		async (req, res) => {
			try {
				const backpacks = await Backpack.find({});
				if (!backpacks) res.status(401).json({ error: 'No Backpacks found' });
				res.status(200).send(backpacks);
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//Logged Admin can add backpack
	app.post(
		'/api/backpacks/add',
		Authentication.requireLogin,
		async (req, res) => {
			const { backpack } = req.body;
			//console.log('Backpack is:', backpack);
			try {
				const newBackpack = await Backpack.create(backpack);
				if (!newBackpack)
					res.status(401).json({ error: 'Creating backpack failed' });
				res.status(200).json({ message: 'Backpack created' });
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged Admin can remove backpack
	app.get(
		'/api/backpacks/:id/del',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.id;
			console.log('Id is:', id);
			try {
				const deletedBackpack = await Backpack.remove({ _id: id });
				if (!deletedBackpack)
					res.status(401).json({ error: 'Removing backpack failed' });
				res.status(200).json({ message: 'Backpack removed' });
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged user can fetch a user specific backpack
	app.get(
		'/api/backpacks/user/:id',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.id;
			console.log('Id is:', id);
			try {
				const fetchedBackpack = await Backpack.findOne({ user_id: id });
				if (!fetchedBackpack)
					res.status(401).json({ error: 'fetching backpack failed' });
				res.status(200).json({
					message: 'Backpack fetched',
					backpack: fetchedBackpack
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged user can fetch a specific backpack
	app.get(
		'/api/backpacks/:id',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.id;
			console.log('Id is:', id);
			try {
				const fetchedBackpack = await Backpack.findOne({ _id: id });
				if (!fetchedBackpack)
					res.status(401).json({ error: 'fetching backpack failed' });
				res.status(200).json({
					message: 'Backpack fetched',
					backpack: fetchedBackpack
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);

	//logged user can update and existing backpack
	app.post(
		'/api/backpacks/:id/update',
		Authentication.requireLogin,
		async (req, res) => {
			console.log(req);
			const id = req.params.id;
			const backpack = req.body;
			console.log('Id is:', id);
			try {
				const updatedBackpack = await Backpack.findOneAndUpdate(
					{ _id: id },
					backpack
				);
				if (!updatedBackpack)
					res.status(401).json({ error: 'updating backpack failed' });
				res.status(200).json({
					message: 'Backpack updated',
					backpack: updatedBackpack
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
};
