const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
User = mongoose.model('users');

module.exports = function(passport) {
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser((user, done) => {
		//console.log('_passport_Serialize');
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser((id, done) => {
		//console.log('_passport_DeSerialize');
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: keys.googleAuth.clientID,
				clientSecret: keys.googleAuth.clientSecret,
				callbackURL: keys.googleAuth.callbackURL,
				passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
			},
			function(req, token, refreshToken, profile, done) {
				// asynchronous

				process.nextTick(() => {
					// check if the user is already logged in
					if (!req.user) {
						User.findOne({ googleId: profile.id }, (err, user) => {
							if (err) return done(err);

							if (user) {
								// if there is a user id already but no token (user was linked at one point and then removed)
								if (!user.googleToken) {
									user.googleToken = token;
									user.name = profile.displayName;
									user.avatar = profile.photos[0].value || '';
									user.googleEmail = (profile.emails[0].value || ''
									).toLowerCase(); // pull the first email

									user.save(err => {
										if (err) return done(err);

										return done(null, user);
									});
								}

								return done(null, user);
							} else {
								const newUser = new User();

								newUser.googleId = profile.id;
								newUser.googleToken = token;
								newUser.name = profile.displayName;
								newUser.avatar = profile.photos[0].value || '';
								newUser.googleEmail = (profile.emails[0].value || ''
								).toLowerCase(); // pull the first email

								newUser.save(err => {
									if (err) return done(err);

									return done(null, newUser);
								});
							}
						});
					} else {
						// user already exists and is logged in, we have to link accounts
						const user = req.user; // pull the user out of the session

						user.googleId = profile.id;
						user.googleToken = token;
						user.name = profile.displayName;
						user.avatar = profile.photos[0].value || '';
						user.googleEmail = (profile.emails[0].value || '').toLowerCase(); // pull the first email

						user.save(err => {
							if (err) return done(err);

							return done(null, user);
						});
					}
				});
			}
		)
	);
};
