import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Input, message, Button } from 'antd';
import history from 'utils/history';
import styles from './Login.less';

@inject('login')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChangeName = (e) => {
        this.props.login.account = e.target.value;
    }

    handleChangePassword = (e) => {
        this.props.login.password = e.target.value;
    }

    handleLogin = () => {
        const { account, password } = this.props.login;
        if (!account) {
            message.warn('请输入用户名');
            return;
        }
        if (!password) {
            message.warn('请输入密码');
            return;
        }
        this.props.login.postLoginSubmit({ account, password }, (res) => {
            if (res.errcode == 0) {
                const { account, name, menu } = res.data;
                localStorage.setItem('webInfo', JSON.stringify({ account, name, menu }));
                history.push('/bankCardList');
            } else {
                message.error(res.msg || '登录失败');
            }
        });
    }

    render() {
        return (
            <div className={'flexcc w12'}>
                <div className={styles.login}>
                    <div className={styles.header}>银行管理系统</div>
                    <div className={'flexac pt20 pr30'}>
                        <span className={'w3 pr15 tr'}>用户名</span>
                        <Input 
                            className={'col'}
                            placeholder={'请输入用户名'}
                            onChange={this.handleChangeName}
                            onKeyUp={(e) => {
                                e.stopPropagation();
                                if (e.keyCode == 13) {
                                    this.handleLogin();
                                }
                            }}
                        />
                    </div>
                    <div className={'flexac pt20 pr30'}>
                        <span className={'w3 pr15 tr'}>密码</span>
                        <Input 
                            className={'col'}
                            placeholder={'请输入密码'}
                            type={'password'}
                            onChange={this.handleChangePassword}
                            onKeyUp={(e) => {
                                e.stopPropagation();
                                if (e.keyCode == 13) {
                                    this.handleLogin();
                                }
                            }}
                        />
                    </div>
                    <div className={'flexcc pt20'}>
                        <Button onClick={this.handleLogin} type={'primary'} size={'large'}>
                            <span className={'plr30'}>登录</span> 
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}