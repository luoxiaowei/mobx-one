import Router from '../Router';
import StatStore from './actions/store';
import StatList from './StatList/StatList';

Router.addRoute({
    title: '总概览',
    path: '/stat',
    authKey: 'MENU_STAT',
    childs: [
        {
            title: '商户列表',
            path: '/statList',
            component: StatList,
            isMune: true,
            authKey: 'MENU_STAT',
        }
    ]
});

Router.addStore({
    stat: new StatStore()
});