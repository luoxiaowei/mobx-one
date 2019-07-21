const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, '../src/index.js'), //工程入口文件,
    output:{
        filename: 'js/[name].[hash:7].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true
            }
        }),
        
    ],
    module:{
        rules:[
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    formatter: require("eslint-friendly-formatter"),
                    quiet: true,
                    emitWarning: true
                }
            },
            {
                test: /\.(js|jsx)$/,
                loader: ["babel-loader"],
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
            components: path.resolve(__dirname, "../src/components"),
            utils: path.resolve(__dirname, "../src/utils"),
            static: path.resolve(__dirname, "../static")
        }
    }
}