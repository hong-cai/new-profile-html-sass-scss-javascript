/*****   Setup Cofigurations,No Manually Typed Commands   *****/
const path = require('path'); //Path Module from Node.js,Create Relative Route
const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === process.env.NODE_ENV || 'development';
//All Configurations Go In Module Object
module.exports = {
    entry: {
        'profile': ['./src/js/index.js', './src/css/main.scss'],
        'panel': ['./src/js/panel-index.js', './src/css/panel.scss']
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
        inline: true, //Inject Javascript Inline
        liveReload: false
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: "./css/[name].css"
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment'
        }),
        new webpack.HotModuleReplacementPlugin(
            { multiStep: true }
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
                        //HMR:Hot Module Reloding
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            minimize: false,
                            outputStyle: 'expanded'
                        }
                    }

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
                        name: "[name].[ext]",
                        outputPath: "css/img",
                        publicPath: "./img",
                    }
                }]
            }

        ]
    }

}
