
const CommonConfig = require("./webpack.config");
const path = require("path");
const net = require("net");

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

const localPort = ((port) => { // 获取当前IP
    let server = net.createServer().listen(port)
    server.on('listening', function () { // 执行这块代码说明端口未被占用
        server.close() // 关闭服务
        return port;
    })
    
    server.on('error', function (err) {
        if (err.code === 'EADDRINUSE') { // 端口已经被使用
            return localPort(port + 1);
        }
    })
})(7000);

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
        port: localPort,
        host: localIp, 
        open: true,
        clientLogLevel: "none", // 模块热替换时不在控制台显示消息
        proxy: {
            "/api": {
                target: "http://154.92.18.182",
                pathRewrite: {"" : ""}
            }
        }
    },
};