const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = 'production';
// 'production'
module.exports = {

    entry: './backend/frontend/index.js',
    output:{
        path: path.join(__dirname, './backend/public'),
        filename: 'js/bundle.js'
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
                test: /\.(jpg|png|svg)$/,
                use: {
                  loader: 'url-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            { 
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader,
                        options:{
                            hmr: devMode,
                            reloadAll: true,
                        }
                    },
                    'css-loader',
                    'sass-loader',
                    //'postcss-loader',
                ]
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: './backend/frontend/index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'css/bundle.css',
            chunkFilename: '[id].css',
            //ignoreOrder: false, 
        })
    ]
}