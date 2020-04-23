/*****   Setup Cofigurations,No Manually Typed Commands   *****/
const path = require('path'); //Path Module from Node.js,Create Relative Route
//Set Up an Entry Point
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//All Configurations Go In Module Object
module.exports = {
    mode: 'development',
    entry: "./src/js/index.js",
    output: {
        filename: "./js/bundle.js",
        path: path.resolve(__dirname, "dist"), //Distribution Folder
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    watch: true,
    // watchOptions:{
    //     aggregationTimeout:500,
    //     poll:1000,
    //     ignored:/node_modules/
    // },
    // devtool: 'source-maps',
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        hot: true, //Update Without Reload
        open: true, //Open Page When Start Server
        inline: true //Inject Javascript Inline
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "Profile project",
                template: path.resolve("./src/index.html")
            }
        ),
        new webpack.HotModuleReplacementPlugin(),
        // new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin(
            {
                filename: "./css/[name].css"
            }
        ),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                // exclude: /"3d-button.scss|pie.scss"/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: '[name].[ext]',
                        outputPath: '../../img',
                    }
                }]
            }
        ]
    }

}
