const passport = require('passport');

module.exports = (app, passport) => {
	// google ---------------------------------
	// send to google to do the authentication
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	// the callback after google has authenticated the user
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			if (req.user) {
				res.redirect('/items');
			} else {
				res.json({
					Login: 'Failed'
				});
			}
		}
	);

	//Api
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		//console.log('Logged in user is', req.user);
		res.status(200).send(req.user);
	});
};
