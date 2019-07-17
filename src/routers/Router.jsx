import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'mobx-react';
import history from '../utils/history';
import { isAuth } from '../utils/utils';
import Layout from './Layout/Main';
import Login from './Login/views/Login';
import { NotFound } from 'components/Common';

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
            return item.childs ? this.renderRoute(item.childs) : (isAuth(item.authKey)) ? (
                <Route key={'route' + item.path} {...item}></Route>
            ) : null;
        })
    }
    render() {
        return (
            <Provider {...stores}>
                <Router history={history}>
                    <Route 
                        render={({ location }) => {
                            if (location.pathname === '/login') {
                                return (
                                    <Route path={'/login'} component={Login} />
                                );
                            } else {
                                return (
                                    <Layout menuList={routers} location={location}>
                                        <Switch>
                                            <Route path='/' exact render={() => (<Redirect to={'/bankCardList'} />)}/>
                                            {this.renderRoute(routers)}
                                            <Route component={NotFound} />
                                        </Switch>
                                    </Layout>
                                )
                            }
                        }}
                    />
                </Router>
            </Provider>
        );
    }
}

export default Main;