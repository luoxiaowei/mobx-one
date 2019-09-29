const chokidar = require('chokidar');
const fs = require("fs");
const ejs = require("ejs");
const { commonPath, commonAjaxMethod } = require('./common');
let argv = process.argv;
argv.shift();
argv.shift();
switch (argv[0]) {
    case 'views': 
        argv.shift();
        createViews(argv);
        break;
    case 'router':
        argv.shift();
        createRouter(argv);
        break;
    default:
        createRouter(argv);
}
function createViews() {

}
/**
 * 
 * @param {Array} router [name, title=[*], views=name1,name2]
 */
function createRouter(router) { 
    console.log(router);
    let create = {
        name: router.shift()
    }; 
    router.forEach(item => {
        let arr = item.split('=');
        create[arr[0]] = arr[1];
    });

}  
// 监听后自动生成模块
chokidar.watch(commonPath.CREATEJSON).on('all', () => {
    const routers = fs.readdirSync(commonPath.CREATEFILE); // 获取已经存在的模块名
    const createJson = JSON.parse(fs.readFileSync(commonPath.CREATEJSON, 'utf8')); // 获取 create 数据
    createJson.routers.forEach(create => {
        const { name, title, views } = create;
        if (routers.indexOf(name) == -1) { // 创建新的module
            const PATH = commonPath.CREATEFILE + '/' + name;
            const actionsPATH = PATH + '/actions';
            const viewsPATH = PATH + '/views';
            fs.mkdir(PATH, {}, () => {
                !fs.existsSync(actionsPATH) && fs.mkdirSync(actionsPATH);
                !fs.existsSync(viewsPATH) && fs.mkdirSync(viewsPATH);
                // index.js
                ejs.renderFile(commonPath.TPL + '/index.tpl', { name, title }, {}, function(err, str){
                    fs.writeFile(PATH + '/index.js', str, (err) => {
                        if(err) throw err; 
                    });
                });
                let keys = Object.keys(views);
                // actions api.js
                ejs.renderFile(commonPath.TPL + '/actions/api.tpl', {
                    name,
                    keys,
                    views,
                    commonAjaxMethod
                }, {}, function(err, str){
                    fs.writeFile(actionsPATH + '/api.js', str, (err) => {
                        if(err) throw err; 
                    });
                });
                // actions store.js
                ejs.renderFile(commonPath.TPL + '/actions/store.tpl', {
                    name,
                    views,
                    keys,
                    commonAjaxMethod
                }, {}, function(err, str){
                    fs.writeFile(actionsPATH + '/store.js', str, (err) => {
                        if(err) throw err; 
                    });
                });
                // views main.js
                ejs.renderFile(commonPath.TPL + '/views/Main.jsx', {
                    name,
                    views,
                    keys,
                }, {}, function(err, str){
                    fs.writeFile(viewsPATH + '/' + name + '.js', str, (err) => {
                        if(err) throw err; 
                    });
                });
            });
        }
    });
});



