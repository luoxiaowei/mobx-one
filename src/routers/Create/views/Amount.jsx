import React, { Component } from 'react';
import { Iconfont } from 'components';
import history from 'utils/history';
import { observer, inject } from "mobx-react";
import { getQuery } from 'utils/utils';
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

    handleChange = (e) => {
        this.props.create.amount = e.target.value;
    }

    handleChangeUser = (e) => {
        this.props.create.user_number = e.target.value;
    }

    render() {
        const { location } = this.props;
        const { id } = getQuery(location.search) || {};
        return (
            <div className={'flexfc flexjc p15'} style={{ height: '90vh' }}>
                {/* <div className={'pb20'}>
                    <div className={'pb5'}>支付方式</div>
                    <div className={'flexac'}>
                        <Iconfont className={'csuccess fs24'} type={'gouyonghu'} />
                        <div className={'input ml15'}>支付宝</div>
                    </div>
                    
                </div> */}
                <div className={'pb20'}>
                    <div className={'pb5'}>游戏账号</div>
                    <input 
                        value={this.props.create.user_number}
                        type={'text'} 
                        onChange={this.handleChangeUser} 
                        placeholder={'请输入游戏账号'} 
                        onFocus={() => {
                            this.top = document.body.scrollTop;
                        }}
                        onBlur={() => {
                            document.body.scrollTop = this.top || 0;
                        }}
                    />
                </div>
                <div className={'pb20'}>
                    <div className={'pb5'}>存款金额</div>
                    <input 
                        value={this.props.create.amount}
                        type={'number'} 
                        onChange={this.handleChange} 
                        placeholder={'请输入存款金额'} 
                        onFocus={() => {
                            this.top = document.body.scrollTop;
                        }}
                        onBlur={() => {
                            document.body.scrollTop = this.top || 0;
                        }}
                    />
                </div>
                {/* <span className={'fs12 pb20 cwarn'}>请注意：此金额需和实际支付金额相同，否则将无法自动上分</span> */}
                <div className={'flexjc pt20'}>
                    <button onClick={() => {
                        this.props.create.getOrder(id, (res) => {
                            history.push('/order', { ...res.data });
                        });
                    }}>下一步</button>
                </div>
            </div>
        );
    }
}