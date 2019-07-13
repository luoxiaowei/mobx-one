import Router from '../Router';
import BusinessStore from './actions/store';
import BusinessList from './BusinessList/BusinessList';

Router.addRoute({
    title: '商户管理',
    path: '/business',
    childs: [
        {
            title: '商户展示',
            path: '/businessList',
            component: BusinessList,
            isMune: true
        }
    ]
});
Router.addStore({
    business: new BusinessStore()
});