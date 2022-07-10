'use strict';

const path = require( 'path' );

const CleanTerminalPlugin = require( 'clean-terminal-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	entry: [
		'./src/script.mjs',
		'./src/style.css'
	],
	output: {
		path: path.resolve( '.' ),
		filename: './dist/script.[contenthash].js'
	},
	devServer: {
		hot: true
	},
	plugins: [
		new CleanTerminalPlugin( { beforeCompile: true } ),
		new CleanWebpackPlugin( {
			cleanOnceBeforeBuildPatterns: [ './dist' ]
		} ),
		new HtmlWebpackPlugin( {
			template: './src/index.html',
			filename: './index.html',
			hash: true
		} ),
		new MiniCssExtractPlugin( { filename: './dist/style.[contenthash].css' } )
	],
	module: {
		rules: [ {
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: { presets: [ '@babel/preset-env' ] }
			}
		}, {
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
					options: { postcssOptions: { plugins: [ 'postcss-preset-env' ] } }
				}
			]
		} ]
	},
	optimization: {
		minimizer: [
			'...', // This line prevents replacement of the existing minimizers.
			new CssMinimizerPlugin()
		]
	}
};
