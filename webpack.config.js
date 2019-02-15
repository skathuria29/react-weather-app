// enter entry and out files
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;


// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = () => {

    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'), //this is the abs path on machine you want o/p of that webpack
            filename: 'bundle.js'
        },
        performance: {
            hints: false
        },
        node: {
            fs: "empty"
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/, // run through all the js files in your application
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]

            }]
        }, plugins:[
            new webpack.DefinePlugin(envKeys)
        ],
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    }
}

