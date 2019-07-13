const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const paletteLess = fs.readFileSync(path.join(__dirname, '../src/styles/variables.less'), 'utf8');
const Theme = lessToJs(paletteLess, {
    resolveVariables: true,
    stripPreFix: true
});

module.exports = {
    entry: path.join(__dirname, '../src/index.js'), //工程入口文件,
    output:{
        filename: 'js/[name].[hash].js',
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
                exclude: /node_modules/,
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
                test: /\.less$/,
                include: /node_modules/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modifyVars: Theme,
                            javascriptEnabled: true
                        }
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
        }
    }
}