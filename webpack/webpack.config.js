const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js') //工程入口文件
    },
    output:{
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '' // 静态资源文件前缀 
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true
            }
        })
    ],
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: [ 
                    path.join(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.less$/,
                use:[
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[name]_[local]_[hash:base64:5]"
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                loader:"url-loader"
            }
        ]
    },
    resolve: {
        extensions: [".jsx", ".js"],
        alias: {
            components: path.resolve(__dirname, "src/components"),
            utils: path.resolve(__dirname, "src/utils"),
        }
    }
}