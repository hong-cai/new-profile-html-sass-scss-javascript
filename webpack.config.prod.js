/*****   Setup Cofigurations,No Manually Typed Commands   *****/
const path = require('path'); //Path Module from Node.js,Create Relative Route
const common = require('./webpack.common');
//Merge common.js and webpack.config.prod.js
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//Merge whatever in common.js with the following content
module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: "./js/[name]-bundle.js",
        // filename:"/js/font-bundle.[contentHash].js",
        path: path.resolve(__dirname, "mvc/public"), //Distribution Folder
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    // resolve: {
    //     alias: {
    //         jquery: path.resolve(__dirname, "mvc/public/js/jquery.min.js")
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "Profile Project(Production)",
                template: path.resolve("./src/index.html"),
                filename: path.resolve(__dirname, "mvc/app/views/profile/index.html"),
            }
        ),
        new CopyPlugin({
            patterns: [
                { from: path.resolve("./src/img"), to: path.resolve(__dirname, 'mvc/public/css/img') },
            ],
        }),

    ],
    optimization: {
        minimize: false

        // minimizer: [new UglifyJsPlugin(
        //     {
        //         cache: true,
        //         parallel: true,
        //         uglifyOptions: {
        //             compress: false,
        //             ecma: 6,
        //             mangle: true
        //         },
        //         sourceMap: true

        //     }
        // )],
    },
    module: {
        rules: [
        ]
    }

}
);