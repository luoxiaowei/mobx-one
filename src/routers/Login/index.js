import Router from '../Router';
import LoginStore from './actions/store';
import Login from './views/Login';

Router.addRoute({
    title: '登录',
    path: '/login',
    component: Login,
    isMune: false
});

Router.addStore({
    login: new LoginStore()
});