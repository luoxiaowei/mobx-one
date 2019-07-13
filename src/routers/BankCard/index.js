import Router from '../Router';
import BankCardStore from './actions/store';
import BankCardList from './BankCardList/BankCardList';

Router.addRoute({
    title: '银行卡管理',
    path: '/bankCard',
    childs: [
        {
            title: '银行卡列表',
            path: '/bankCardList',
            component: BankCardList,
            isMune: true
        }
    ]
});
Router.addStore({
    bankCard: new BankCardStore()
});