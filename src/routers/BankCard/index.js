import Router from '../Router';
import BankCardStore from './actions/store';
import BankCardList from './BankCardList/BankCardList';

Router.addRoute({
    title: '银行卡管理',
    path: '/bankCard',
    authKey: 'MENU_ACCOUNT',
    childs: [
        {
            title: '银行卡列表',
            path: '/bankCardList',
            component: BankCardList,
            isMune: true,
            authKey: 'MENU_ACCOUNT',
        }
    ]
});
Router.addStore({
    bankCard: new BankCardStore()
});