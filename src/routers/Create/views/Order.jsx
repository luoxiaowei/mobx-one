import React, { Component } from 'react';
import { Iconfont } from 'components';
import history from 'utils/history';
import { observer, inject } from "mobx-react"
@inject('create')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleReady = () => {
        
    }

    handleChange = (value) => {
        this.setState({value});
    }

    render() {
        const { location } = this.props;
        const { order_sn, orders_id, bank_id, amount } = location.state || {};
        
        if (!orders_id) {
            history.go(-1);
        }
        return (
            <div className={'flexfc flexjc p15'} style={{ height: '90vh' }}>
                <div className={'pb20'}>
                    <div className={'fs20 tc'}>请放心付款，收到款项后立即为你入账</div>
                    <div className={'flexcc ptb10'}>
                        <Iconfont className={'cmain fs100'} type={'lendmoney'} />
                    </div>
                </div>
                <div className={'flexac pb20'}>
                    <div className={'w3 tr'}>订单号：</div>
                    <div className={'col'}>{order_sn}</div>
                </div>
                <div className={'flexac pb20'}>
                    <div className={'w3 tr'}>存款金额：</div>
                    <div className={'col cred'}>{amount}</div>
                </div>
                <span className={'fs12 pb20 cwarn'}>请注意：若长时间未到账，请联系 <a>在线客服</a> 并提供您的订单号</span>
                <div className={'flexjc pt20'}>
                    <button onClick={() => {
                        this.props.create.getCode({orders_id, bank_id}, (res) => {
                            history.push('/code', { ...location.state, imgSrc: res.data.src });
                        }); 
                    }}>支付去</button>
                </div>
            </div>
        );
    }
}