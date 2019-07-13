import Router from '../Router';
import TestStore from './actions/store';
import One from './One/One';
import Two from './Two/Two';

Router.addRoute({
    title: 'Test',
    path: '/test',
    childs: [
        {
            title: 'one',
            path: '/one',
            component: One,
            isMune: true
        },
        {
            title: 'two',
            path: '/two',
            component: Two,
            isMune: true
        }
    ]
});
Router.addStore({
    test: new TestStore()
});
