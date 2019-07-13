import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, LocaleProvider, Menu, Icon, Button } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { Iconfont } from 'components/Common';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;


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

    render() {
        const { children, menuList, location } = this.props;
        let defaultOpenKeys = this.getDefaultOpenKeys(location.pathname);
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
                        style={{ background: '#fff', marginBottom: 10, position: 'fixed', zIndex: 1, width: '100%', borderBottom: '1px solid #f0f2f5' }}
                    >
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => this.setState({ collapsed: !this.state.collapsed })}
                        />
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