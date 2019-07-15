import list from './list';

const Mock  = require('mockjs');

Mock.mock(/^\/list/, 'get', list);
Mock.mock(/^\/test/, 'get', {
    msg: '',
    success: true
});