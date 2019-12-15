const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    entry: './frontend/index.js',
    output:{
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer:{
        port: '4000'
    },
    resolve:{
        extensions:['.js', '.jsx']
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: './frontend/index.html'
        })
    ]
}