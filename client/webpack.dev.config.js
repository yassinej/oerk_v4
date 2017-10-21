const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const webpack = require('webpack');
//Variable listing all paths for clarity
const paths = {
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
	DIST: path.resolve(__dirname, 'dist')
};

module.exports = {
	entry: [
		'webpack/hot/only-dev-server',
		'babel-polyfill',
		'font-awesome/scss/font-awesome.scss',
		path.join(paths.JS, 'index.js')
	],
	output: {
		path: path.DIST,
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'index.html')
		}),
		new ExtractTextPlugin('style.bundle.css'),
		new TransferWebpackPlugin([{ from: 'src' }])
	],
	module: {
		rules: [
			//Tells webpack to use "babel-loader" for .js and .jsx files
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			//CSS ans scss loaders
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader' // translates CSS into CommonJS modules
						},
						{
							loader: 'postcss-loader', // Run post css actions
							options: {
								plugins() {
									// post css plugins, can be exported to postcss.config.js
									return [precss, autoprefixer];
								}
							}
						},
						{
							loader: 'sass-loader' // compiles SASS to CSS
						}
					]
				})
			},
			// font-awesome
			{
				test: /font-awesome\.config\.js/,
				use: [{ loader: 'style-loader' }, { loader: 'font-awesome-loader' }]
			},
			//url-loader
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000'
			},
			//images loaders
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=images/[name].[ext]',
					'image-webpack-loader?bypassOnDebug'
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	devServer: {
		hot: true, // Live-reload
		inline: true,
		historyApiFallback: {
			disableDotRule: true
		},
		proxy: [
			{
				context: ['/auth', '/api'],
				target: 'http://localhost:5000/',
				secure: false,
				changeOrigin: true
			}
		]
	}
};
