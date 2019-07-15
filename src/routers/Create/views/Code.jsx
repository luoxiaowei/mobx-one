import React, { Component } from 'react';
import history from 'utils/history';
import { observer, inject } from "mobx-react"
import api from '../actions/api';
@inject('create')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (value) => {
        this.setState({value});
    }

    render() {
        const { location } = this.props;
        const { order_sn, orders_id, bank_id, amount, imgSrc } = location.state || {};
        if (!orders_id) {
            history.go(-1);
        }
        return (
            <div className={'flexfc flexjc p15'} style={{ height: '90vh' }}>
                <div className={'tc pb20'}>
                    <span className={'pr5'}>订单号：</span>
                    <span>{order_sn}</span>
                </div>
                <div className={'tc'}>重复扫码不到账，请只支付一次（5分钟内有效）</div>
                <div className={'cred tc ptb20 fs20'}>100000 元</div>
                {/* <div className={'tc pb20'}>倒计时： </div> */}
                <div className={'tc pb10'}>请支付宝识别二维码，扫码付款</div>
                <div className={'flexcc'}>
                    <div ref={ref => this.imgs = ref}></div>
                    <img className={'wh250'} src={imgSrc} />
                </div>
                <div className={'flexjc pt20'}>
                    <button onClick={() => {
                        history.push('/member', { orders_id, bank_id });
                    }}>已转帐</button>
                </div>
            </div>
        );
    }
}