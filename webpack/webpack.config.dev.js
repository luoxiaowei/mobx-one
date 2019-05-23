
const CommonConfig = require("./webpack.config");
const path = require("path");

module.exports = {
    ...CommonConfig,
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://127.0.0.1:7000',
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../src/index.js')
    ],
    devtool: 'source-map',
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        historyApiFallback: true,
        hot: true, 
        inline: true,
        overlay: true,
        port: 7000,
        host: '127.0.0.1',
        proxy: {
            "/api": {
                target: "http://127.0.0.1:7001",
                pathRewrite: {"^/api" : ""}
            }
        }
    },
};