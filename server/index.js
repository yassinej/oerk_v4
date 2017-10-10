//Module Import
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Local ressources Import
const keys = require('./config/keys');

//Variables
const port = keys.port;
const app = express();

//DB connection
mongoose.connect(keys.mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

//Middleware use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routing
app.get('/', function(req, res) {
	res.status(200).json({ hello: 'There' });
});

//Starting Server
app.listen(port, function() {
	console.log('API Server Listening on port', port);
});
