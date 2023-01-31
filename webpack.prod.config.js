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
	entry: modules.reduce((config, modul) => {
		config[modul] = `./src/modules/${modul}/script.js`;
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

		// new HtmlWebpackPlugin({
		// 	inject: true,
		// 	template: `src/pages/index.html`,
		// 	filename: `index.html`,
		// 	chunks: [].concat(modules.map((modul) => modul)),
		
		// }),
		// new HtmlWebpackPlugin({
		// 	inject: true,
		// 	template: `src/pages/about.html`,
		// 	filename: `about.html`,
		// 	chunks: [].concat(modules.map((modul) => modul)),
		
		// }),
      
	]
	.concat(
		pages.map(
		    (page) => 
			new HtmlWebpackPlugin({
				inject: true,
				template: `src/pages/${page}`,
				filename: `${page}`,
				chunks: [].concat(modules.map((modul) => modul)),
			}),
		)
  	)
	.concat(
		modules.map(
		    (modul) => 
				new HtmlWebpackPlugin({
					inject: true,
					template: `src/modules/${modul}/template.html`,
					filename: `/modules/${modul}/template.html`,
					chunks: [modul],
				})

		)
  	)
	.concat(
		modules.map(
			(modul) => 
				new HtmlWebpackSimpleIncludePlugin([
					//Replace html contents with string or regex patterns
					{
						// this example shows replacing with file contents
						tag: `<include-${modul} />`,
						content: fse.readFileSync(path.resolve(__dirname, `./src/modules/${modul}/template.html`)),
					}
				])
		)
 	)
};