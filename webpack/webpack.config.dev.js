
const CommonConfig = require("./webpack.config");
const path = require("path");

const localIp = (() => { // 获取当前IP
	let ips = [];
	let os = require('os');
	let ntwk = os.networkInterfaces();
	for (let k in ntwk) {
		for (let i = 0; i < ntwk[k].length; i++) {
			let _add = ntwk[k][i].address;
			if (_add && _add.split('.').length == 4 && !ntwk[k][i].internal && ntwk[k][i].family == 'IPv4') {
				ips.push(ntwk[k][i].address);
			}
		}
	}
	return ips[0] || 'localhost';
})();

module.exports = {
    ...CommonConfig,
    entry: [
        'react-hot-loader/patch',
        path.join(__dirname, '../src/index.js')
    ],
    devtool: 'source-map',
    mode: "development",
    devServer: {
        contentBase: [
            path.join(__dirname, '../public')
        ],
        watchContentBase: true,
        compress: true, // 启用gzip压缩
        historyApiFallback: true,
        hot:true,
        inline: true,
        overlay: true, // 编译器错误或警告时， 在浏览器中显示全屏覆盖
        port: 7000,
        host: localIp, 
        open: true,
        clientLogLevel: "none", // 模块热替换时不在控制台显示消息
        proxy: {
            "/api": {
                target: "http://127.0.0.1:7001",
                pathRewrite: {"^/api" : ""}
            }
        }
    },
};