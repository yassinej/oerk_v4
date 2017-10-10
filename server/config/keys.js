if (process.env.NODE === 'production') {
	module.exports = require('./prod.js');
} else {
	module.exports = require('./dev.js');
}
