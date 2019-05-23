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
            component: One
        },
        {
            title: 'two',
            path: '/two',
            component: Two
        }
    ]
});
Router.addStore({
    test: new TestStore()
});
