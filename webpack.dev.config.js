const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackSimpleIncludePlugin = require('html-webpack-simple-include-plugin');
const fse = require('fs-extra');
const webpack = require('webpack');

const pages = [
	"index.html",
	"about.html",
];

const modules = [
	"news",
	"slider"
];

module.exports = {
	entry: modules.reduce((config, module) => {
		config[module] = `./src/modules/${module}/script.js`;
		return config;
	}, {}),

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/[name].js',
		assetModuleFilename: '../assets/[name][ext]',
		clean: true,
	},

	devServer: {
		static: {
			directory: path.join(__dirname, '/'),
		},
		compress: true,
		port: 8080,
	},

	module: {
		rules: [
			{
				test: /\.(sass|scss|css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},

			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},

			{
				test: /\.html$/,
				loader: 'html-loader',
			},

			{
				test: /\.(svg|png|jpe?g|gif)$/,
				type: 'asset/resource',
			},

			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},

	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},

	plugins: [
		new MiniCssExtractPlugin({ filename: 'css/[name].css', }),
		new webpack.HotModuleReplacementPlugin(),
		new LodashModuleReplacementPlugin({
			'collections': true,
			'paths': true,
			'arrays': true,
			'objects': true,
		}),
	]
	.concat(
		pages.map(
			(page) =>
				new HtmlWebpackPlugin({
					inject: true,
					template: `src/pages/${page}`,
					filename: `${page}`,
					chunks: [].concat(modules.map((module) => module)),
				}),
		)
	)
	.concat(
		modules.map(
			(module) =>
				new HtmlWebpackPlugin({
					inject: true,
					template: `src/modules/${module}/template.html`,
					filename: `/modules/${module}/template.html`,
					chunks: [module],
				})

		)
	)
	.concat(
		modules.map(
			(module) =>
				new HtmlWebpackSimpleIncludePlugin([
					//Replace html contents with string or regex patterns
					{
						// this example shows replacing with file contents
						tag: `<include-${module} />`,
						content: fse.readFileSync(path.resolve(__dirname, `src/modules/${module}/template.html`)),
					}
				])
		)
	)
};