const mongoose = require('mongoose');
const Authentication = require('../services/authentication');
Review = mongoose.model('review');

module.exports = app => {
	//Admin can get all reviews from DB
	app.get(
		'/api/reviews',
		Authentication.requireLogin,
		Authentication.requireAdmin,
		async (req, res) => {
			try {
				const reviews = await Review.find({});
				if (!reviews) res.status(401).json({ error: 'No reviews found' });
				res.status(200).send(reviews);
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//Logged user can add review
	app.post(
		'/api/reviews/add',
		Authentication.requireLogin,
		async (req, res) => {
			const { review } = req.body;
			//console.log('Review is:', review);
			try {
				const newReview = await Review.create(review);
				if (!newReview)
					res.status(401).json({ error: 'Creating review failed' });
				res.status(200).json({ message: 'Review created' });
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged user can remove review
	app.get(
		'/api/reviews/:id/del',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.id;
			console.log('Id is:', id);
			try {
				const deletedReview = await Review.remove({ _id: id });
				if (!deletedReview)
					res.status(401).json({ error: 'Removing review failed' });
				res.status(200).json({ message: 'Review removed' });
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged user can fetch one item review
	app.get(
		'/api/reviews/:review_id',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.review_id;
			console.log('review_id is:', id);
			try {
				const fetchedReview = await Review.find({ review_id: id });
				if (!fetchedReview)
					res.status(401).json({ error: 'fetching review failed' });
				res.status(200).json({
					message: 'Review fetched',
					review: fetchedReview
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged user can fetch one item review
	app.get(
		'/api/reviews/:item_id',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.item_id;
			console.log('item_id is:', id);
			try {
				const fetchedReviews = await Review.find({ item_id: id });
				if (!fetchedReviews)
					res.status(401).json({ error: 'fetching item reviews failed' });
				res.status(200).json({
					message: 'Item Reviews fetched',
					reviews: fetchedReviews
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
	//logged user can fetch one item review
	app.get(
		'/api/reviews/:user_id',
		Authentication.requireLogin,
		async (req, res) => {
			const id = req.params.item_id;
			console.log('item_id is:', id);
			try {
				const fetchedReviews = await Review.find({ user_id: id });
				if (!fetchedReviews)
					res.status(401).json({ error: 'fetching user reviews failed' });
				res.status(200).json({
					message: 'User Reviews fetched',
					reviews: fetchedReviews
				});
			} catch (e) {
				res.status(400).json({ error: 'Unexpected error', stack: e });
			}
		}
	);
};
