import Router from '../Router';
import CreateStore from './actions/store';
import Create from './views/Create';

Router.addRoute({
    title: '创建',
    path: '/create',
    component: Create,
    isMune: true
});

Router.addStore({
    create: new CreateStore()
});