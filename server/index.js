//Module Import
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

//Local ressources Import
const keys = require('./config/keys');

//Importing all data models and services
require('./models/User');
require('./models/Item');
require('./models/Review');
require('./models/Backpack');
require('./services/passport')(passport);

//Variables
const port = keys.port;
//const seedDB = require('./services/seed');
const app = express();

//DB connection
mongoose.connect(keys.mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

//Seeding DB
//seedDB();

//Middleware use
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

//Routing
app.get('/', function(req, res) {
	res.status(200).json({ hello: 'There' });
});
require('./routes/authRoutes')(app, passport);

//Starting Server
app.listen(port, function() {
	console.log('API Server Listening on port', port);
});
