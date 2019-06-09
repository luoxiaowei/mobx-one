import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';
import history from '../utils/history';
import Layout from './Layout/Main';

let routers = [];
let stores = {};
class Main extends Component {
    static addStore (store) {
        stores = {
            ...stores,
            ...store
        };
    }
    static addRoute (modules) {
        if (modules instanceof Array) {
            routers.push(modules);
        } else {
            routers.push(modules);
        }
        
    }
    constructor(props) {
        super(props);
    }

    renderRoute = (routers) => {
        return routers.map(item => {
            return item.childs ? this.renderRoute(item.childs) : (
                <Route key={item.path} {...item}></Route>
            );
        })
    }
    render() {
        return (
            <Provider {...stores}>
                <Router history={history}>
                    <Route 
                        render={({ location }) => {
                            return (
                                <Layout>
                                    <Switch>
                                        <Route path='/' exact render={() => (<Redirect to={'/create'} />)}/>
                                        {this.renderRoute(routers)}
                                    </Switch>
                                </Layout>
                            )
                        }}
                    />
                </Router>
            </Provider>
        );
    }
}

if (module.hot) { // 启用热更新
	module.hot.accept(routers, () => {
		console.log('[HRM] routers Callback');
	});
}

export default Main;