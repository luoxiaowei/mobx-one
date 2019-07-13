import Router from '../Router';
import OrderStore from './actions/store';
import OrderList from './OrderList/OrderList';

Router.addRoute({
    title: '订单管理',
    path: '/order',
    childs: [
        {
            title: '订单列表',
            path: '/orderList',
            component: OrderList,
            isMune: true
        }
    ]
});
Router.addStore({
    order: new OrderStore()
});