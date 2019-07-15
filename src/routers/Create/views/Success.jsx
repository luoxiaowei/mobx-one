import React, { Component } from 'react';
import history from 'utils/history';
import { observer, inject } from "mobx-react";
import { Iconfont } from 'components/Common';
@inject('create')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <div className={'flexfc flexcc p15'} style={{ height: '90vh' }}>
                <Iconfont className={'cmain fs100'} type={'emotion'} />
                <div className={'fs24 cmain pt20'}>充值成功</div>
            </div>
        );
    }
}