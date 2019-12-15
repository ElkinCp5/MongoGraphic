const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    entry: './backend/index.js',
    output:{
        path: path.join(__dirname, 'backend/frontend/build'),
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
            template: './backend/frontend/index.html'
        })
    ]
}