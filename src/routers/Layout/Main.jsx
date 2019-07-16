import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from "mobx-react";
import { Link } from 'react-router-dom';
import { Layout, LocaleProvider, Menu, Icon, Button, Dropdown } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { Iconfont } from 'components/Common';
import history from 'utils/history';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

@inject('login')
@observer

export default class Main extends Component {
    static propTypes = {
        children: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    renderMenu = (list) => {
        return list && list.map(item => {
            if (item.childs && item.childs.length > 0) {
                return (
                    <SubMenu key={item.path} title={
                        <div>
                            <Iconfont className={'pr10 cwhite'} type={item.icon || 'product'} />
                            <span>{item.title}</span>
                        </div>
                    }>
                        {this.renderMenu(item.childs)}
                    </SubMenu>
                );
            } else {
                return item.isMune ? (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            <Iconfont className={'pr10 cwhite'} type={item.icon || 'product'} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ) : null;
            }
        });
    }
    getDefaultOpenKeys = (key) => {
        const { menuList } = this.props;
        let keys = [];
        const run = (list, pid) => {
            list.forEach(item => {
                if(key == item.path) {
                    return pid ? keys = [pid] : null;
                }
                if (item.childs && item.childs.length > 0) {
                    run(item.childs, item.path);
                }
            })
        }
        run(menuList);
        return keys;
    }

    handleOut = () => {
        this.props.login.postLoginOut((res) => {
            if (res.errcode == 0) {
                localStorage.removeItem('webInfo');
                history.push('/login');
            } else {
                message.error(res.msg || '退出失败');
            }
        });
    }

    render() {
        const { children, menuList, location } = this.props;
        let defaultOpenKeys = this.getDefaultOpenKeys(location.pathname);
        let webInfo = {};
        try {
            webInfo = JSON.parse(localStorage.getItem('webInfo'));
        } catch(err) {
            history.push('/login');
        }
        if (!webInfo || !(webInfo || {}).name) {
            history.push('/login');
        }
        return (
            <Layout>
                <Sider collapsed={this.state.collapsed}>
                    <div style={{ height: 100 }}></div>
                    <Menu
                        theme={'dark'}
                        mode="inline"
                        defaultOpenKeys={defaultOpenKeys}
                        defaultSelectedKeys={[location.pathname]}
                    >
                        {this.renderMenu(menuList)}
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{ 
                            position: 'fixed', 
                            zIndex: 10, 
                            borderBottom: '1px solid #f0f2f5', 
                            width: 'calc(100% - 200px)'
                        }}
                        className={'w12 mb10 bgwhite'}
                    >
                        <div style={{ height: '64px', lineHeight: '64px' }} className={'flexsb bgwhite'}>
                            <div className={'flexac'}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={() => this.setState({ collapsed: !this.state.collapsed })}
                                />
                            </div>
                            <div className={'flexac'}>
                                {/* <Dropdown overlay={<Menu>
                                        <Menu.Item>
                                            <span>退出</span>
                                        </Menu.Item>
                                    </Menu>} placement="bottomCenter">
                                    <div>
                                        <Iconfont type={'user'} />
                                        <span onClick={this.handleOut} className={'pl10 poi cmain'}>{(webInfo || {}).name}, 退出</span>
                                    </div>
                                </Dropdown> */}
                                <Iconfont type={'user'} />
                                <span onClick={this.handleOut} className={'pl10 poi cmain'}>{(webInfo || {}).name}, 退出</span>
                            </div>
                        </div>
                        
                    </Header>
                    <Content
                        style={{ marginTop: 74 }}
                    >
                        <LocaleProvider locale={zhCN}>
                            <div className={'p20 bgwhite'}>
                                { children }
                            </div>
                        </LocaleProvider>
                    </Content>
                </Layout>
            </Layout>
           
        );
    }
}