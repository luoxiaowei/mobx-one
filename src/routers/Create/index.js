import Router from '../Router';
import CreateStore from './actions/store';
import Create from './Create';

Router.addRoute({
    title: '创建',
    path: '/create',
    component: Create
});

Router.addStore({
    create: new CreateStore()
});