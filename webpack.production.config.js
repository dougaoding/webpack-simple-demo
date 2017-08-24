const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    //添加打包后报错时的映射
    devtool: 'eval-source-map',
    entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },
    //添加服务器
    devServer: {
        contentBase: './public/', //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true,
        port: 8088
    },
    module: {
        rules: [{
            test: /(.jsx|.js)/,
            use: {
                loader: "babel-loader",
                //这是第一种方式，加options,第二种是加.babelrc文件
                // options: {
                //     presets: [
                //         "es2015", "react"
                //     ]
                // }
            },
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            // use: [{
            //     loader: "style-loader"
            // }, {
            //     loader: "css-loader",
            //     //直接把相关css传递到组件的代码中，避免全局污染
            //     options: {
            //         modules: true
            //     }
            // }, {
            //     loader: "postcss-loader"
            // }]
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        //各组件拥有各自的css,避免全局污染
                        modules: true,
                        //压缩css
                        minimize: true
                    },
                }, {
                    loader: 'postcss-loader' //css的处理平台
                }]
            })
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        new webpack.BannerPlugin("丁斗刚所有，不过也是抄的!"),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        //new 一个这个插件的实例，并添加相关js和css
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ]
}