import React, { Component } from 'react';
import history from 'utils/history';
import { observer, inject } from "mobx-react";
import { Toast } from 'components/Common';
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
        this.props.create.user_number = e.target.value;
    }

    render() {
        const { location } = this.props;
        const { orders_id, bank_id, amount, imgSrc } = location.state || {};
        if (!orders_id) {
            history.go(-1);
        }
        return (
            <div className={'flexfc flexjc p15'} style={{ height: '90vh' }}>
                <div className={'flexac pb20'}>
                    <div className={'w3'}>上传图片：</div>
                    <input className={'col'}/>
                </div>
                <div className={'flexac pb20'}>
                    <div className={'w3'}>会员账号：</div>
                    <input className={'col'} onChange={this.handleChange} placeholder={'请输入会员账号'} />
                </div>
                <div className={'flexjc pt20'}>
                    <button
                        onClick={() => {
                            this.props.create.getMember({
                                orders_id,
                                image: this.props.create.image,
                                user_number: this.props.create.user_number,
                                bank_id
                            }, (res) => {
                                console.log(123);
                                history.push('/success');
                            })
                        }}
                    >确定</button>
                </div>
            </div>
        );
    }
}