const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'App.jsx')],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.js',
	},
	resolve: {
		alias: {
			Public: path.resolve(__dirname, 'public/'),
			Components: path.resolve(__dirname, 'src/components/'),
			Scss: path.resolve(__dirname, 'src/scss/'),
			Images: path.resolve(__dirname, 'src/images/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash]-[name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: path.resolve(__dirname, 'public', 'index.html'),
		}),
	],
};
