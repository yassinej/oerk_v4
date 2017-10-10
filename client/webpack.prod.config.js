const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Variable listing all paths for clarity
const paths = {
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
	DIST: path.resolve(__dirname, 'dist')
};

module.exports = {
	entry: path.join(paths.JS, 'index.js'),
	output: {
		path: path.DIST,
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html')
		}),
		new ExtractTextPlugin('style.bundle.css')
	],
	module: {
		rules: [
			//Tells webpack to use "babel-loader" for .js and .jsx files
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			// Files will get handled by css loader and then passed to the extract text plugin
			// which will write it to the file we defined above
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ use: 'css-loader' })
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: ['file-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
