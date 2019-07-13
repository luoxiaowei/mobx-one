import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routers/Router';
import '../mock/mock';
import './styles/index.less';
import './routers';

ReactDOM.render(<Router />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept(err => {
        console.log(err);
    })
}