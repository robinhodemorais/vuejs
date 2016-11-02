var webpack = require('webpack');
var ExtractPlugin = require('extract-text-webpack-plugin');
var ExtractCSS = new ExtractPlugin('css/app.css');

module.exports = {
    devtool: 'source-map',
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
        publicPath: '/dist/'
    },
    plugins:[
       new webpack.ProvidePlugin({
            'window.$':'jquery',
            'window.jQuery':'jquery'
        }),
       ExtractCSS,
       new webpack.HotModuleReplacementPlugin()

    ],
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: 'url?limit=100000'
            },
            {
                test: /\.scss$/,
                loader: ExtractCSS.extract(['css','sass'])
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        /*inclui um JS na app, para controlar o live-reload, para atualizar o broswer*/
        inline: true,
        watchOptions: {
            poll: true,
            aggregateTimeout: 300
        }
    }
};