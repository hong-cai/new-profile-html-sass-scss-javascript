/*****   Setup Cofigurations,No Manually Typed Commands   *****/
const path = require('path'); //Path Module from Node.js,Create Relative Route
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
//All Configurations Go In Module Object
module.exports = {
    entry: "./src/js/index.js",
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: "./css/[name].css"
            }
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
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
                            hmr: isDevelopment,
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
                        outputPath: 'css/img',
                        publicPath: 'css/img',
                    }
                }]
            }

        ]
    }

}
