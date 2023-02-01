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
		filename: '[name]/script.js',
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
		new MiniCssExtractPlugin({ filename: '[name]/style.css', }),
		new webpack.HotModuleReplacementPlugin(),
		new LodashModuleReplacementPlugin({
			'collections': true,
			'paths': true,
			'arrays': true,
			'objects': true,
		}),
	]
	.concat(
		modules.map(
		    (module) =>
				new HtmlWebpackPlugin({
					inject: true,
					template: `src/modules/${module}/template.html`,
					filename: `${module}/template.html`,
					chunks: [module],
				})

		)
  	)
};