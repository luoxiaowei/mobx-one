
const path = require("path");

const commonPath = {
    CREATEJSON: path.join(__dirname, '../../webpack/helper/create.json'),
    ROUTERJSON: path.join(__dirname, '../../src/routers/index.js'),
    CREATEFILE: path.join(__dirname, '../../src/routers'),
    TPL: path.join(__dirname, '../../webpack/helper/tpl'),
};

const commonAjaxMethod = {
    List: 'get',
    Form: 'post'
}
module.exports = {
    commonPath,
    commonAjaxMethod
} 