import React, { Component } from 'react';
import history from 'utils/history';
import { observer, inject } from "mobx-react";
import { UploadImg } from 'components';
@inject('create')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChangeImage = (imgs) => {
        this.props.create.image = imgs[0];
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
            <div className={'flexfc flexjc p15'} style={{ height: '75vh' }}>
                <div className={'flexac pb20'}>
                    <div className={'w5'}>上传转账截图图片：</div>
                    <UploadImg 
                        onChange={this.handleChangeImage}
                    />
                </div>
                {/* <div className={'flexac pb20'}>
                    <div className={'w3'}>会员账号：</div>
                    <input className={'col'} onChange={this.handleChange} placeholder={'请输入会员账号'} />
                </div> */}
                <div className={'flexjc pt20'}>
                    <button
                        onClick={() => {
                            this.props.create.getMember({
                                orders_id,
                                image: this.props.create.image,
                                // user_number: this.props.create.user_number,
                                bank_id
                            }, (res) => {
                                history.push('/success');
                            })
                        }}
                    >确定</button>
                </div>
            </div>
        );
    }
}