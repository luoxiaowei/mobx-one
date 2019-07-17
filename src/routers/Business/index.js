import Router from '../Router';
import BusinessStore from './actions/store';
import BusinessList from './BusinessList/BusinessList';

Router.addRoute({
    title: '商户管理',
    path: '/business',
    authKey: 'MENU_MERCHANT',
    childs: [
        {
            title: '商户展示',
            path: '/businessList',
            component: BusinessList,
            isMune: true,
            authKey: 'MENU_MERCHANT',
        }
    ]
});
Router.addStore({
    business: new BusinessStore()
});