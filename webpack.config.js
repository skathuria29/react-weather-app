// enter entry and out files
const path = require('path');
module.exports = {
    
    entry : ['@babel/polyfill', './src/app.js'],
    output : {
        path : path.join(__dirname, 'public'), //this is the abs path on machine you want o/p of that webpack
        filename : 'bundle.js' 
    },
    module : {
        rules : [{
            loader : 'babel-loader',
            test : /\.js$/, // run through all the js files in your application
            exclude : /node_modules/
        },{
            test : /\.s?css$/,
            use : [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
            
        }]
    },
    devtool : 'cheap-module-eval-source-map',
    devServer : {
        contentBase :  path.join(__dirname, 'public')
    }
}