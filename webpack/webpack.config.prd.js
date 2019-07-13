
const CommonConfig = require("./webpack.config");
const path = require("path");

module.exports = {
    ...CommonConfig,
    mode: "production"
};