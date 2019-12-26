import path                     from 'path';
import htmlWebpackPlugin        from 'html-webpack-plugin';
import miniCssExtractPlugin     from 'mini-css-extract-plugin';
import liveReloadPlugin         from 'webpack-livereload-plugin'; 
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
        }),
        new liveReloadPlugin()
        
    ]
}