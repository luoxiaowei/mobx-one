import Router from '../Router';
import OrderStore from './actions/store';
import OrderList from './OrderList/OrderList';

Router.addRoute({
    title: '订单管理',
    path: '/order',
    authKey: 'MENU_ORDERS',
    icon: 'order',
    childs: [
        {
            title: '订单列表',
            path: '/orderList',
            component: OrderList,
            isMune: true,
            authKey: 'MENU_ORDERS',
        }
    ]
});
Router.addStore({
    order: new OrderStore()
});