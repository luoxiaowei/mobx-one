import Router from '../Router';
import CreateStore from './actions/store';
import Amount from './views/Amount';
import Order from './views/Order';
import Code from './views/Code';
import Member from './views/Member';
import Success from './views/Success';

Router.addRoute({
    title: '创建',
    path: '/create',
    childs: [
        {
            title: '充值金额',
            path: '/amount',
            component: Amount,
        },
        {
            title: '订单',
            path: '/order',
            component: Order
        },
        {
            title: '支付二维码',
            path: '/code',
            component: Code
        },
        {
            title: '上传凭证',
            path: '/member',
            component: Member
        },
        {
            title: '充值成功',
            path: '/success',
            component: Success
        }
    ]
});

Router.addStore({
    create: new CreateStore()
});