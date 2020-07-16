/*****   Setup Cofigurations,No Manually Typed Commands   *****/
const common = require('./webpack.common');
const path = require('path'); //Path Module from Node.js,Create Relative Route
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');




//Merge whatever in common.js with the following content
module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: "./js/front-bundle.js",
        path: path.resolve(__dirname, "dist"), //Distribution Folder
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: "Profile Project(Development)",
                template: path.resolve("./src/index.html"),
                filename: "index.html",
            }
        ),
        // new CleanWebpackPlugin(['dist']),

    ],
    module: {
        rules: [

        ]
    }
}
);