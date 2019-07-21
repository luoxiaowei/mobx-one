import React, { Component } from 'react';
import history from 'utils/history';
import { observer, inject } from "mobx-react"
import api from '../actions/api';
import { UploadImg, Toast } from 'components';
@inject('create')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            time: '',
            src: '',
            amount: ''
        };
        this.timer = null;
    }

    handleChange = (value) => {
        this.setState({value});
    }

    componentDidMount() {
        const { location } = this.props;
        const { orders_id, bank_id } = location.state || {};
        if (!orders_id) {
            history.go(-1);
            return;
        }
        this.props.create.getCode({orders_id, bank_id}, (res) => {
            this.setState({
                bank_id, 
                orders_id,
                ...res.data
            });
            let time = res.data.code_left_time;
            if (time <= 0) {
                Toast.info('此二维码已过期 请重新获取', 5, () => {
                    history.go(-2);
                });
                return;
            }
            this.setState({
                time
            }, () => {
                this.timer = setInterval(() => {
                    this.setState({
                        time: this.state.time - 1
                    });
                    localStorage.setItem('time', this.state.time - 1);
                    if (this.state.time <= 0) {
                        clearInterval(this.timer);
                        this.timer = null;
                        Toast.info('此二维码已过期 请重新获取', 5, () => {
                            history.go(-1);
                        });
                    }
                }, 1000);
            });
        }); 
        
        
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
    }

    handleChangeImage = (imgs) => {
        this.props.create.image = imgs[0];
    }

    render() {
        const { location } = this.props;
        const { orders_sn, orders_id, bank_id, amount, src } = this.state || {};
        return (
            <div className={'flexfc flexjc p15'}>
                <div className={'tc pb20'}>
                    <span className={'pr5'}>订单号：</span>
                    <span>{orders_sn}</span>
                </div>
                <div className={'tc'}>重复扫码不到账，请只支付一次（5分钟内有效）</div>
                <div className={'cred tc ptb10 fs20'}>{amount} 元</div>
                <div className={'tc pb10'}>倒计时：{this.state.time} 秒</div>
                <div className={'tl pb10'}>
                    <p>1、使用其他手机打开支付宝扫一扫付款</p>
                    <p>2、使用其他手机拍照，在用自己的手机打开支付宝扫一扫付款</p>
                </div>
                <div className={'flexcc'}>
                    <div ref={ref => this.imgs = ref}></div>
                    <img className={'wh250'} src={src} />
                </div>
                <div className={'flexcc pb10 clight'}>
                    <div>补充上传转账成功截图(可选)</div>
                    <UploadImg 
                        onChange={this.handleChangeImage}
                    />
                </div>
                <div className={'flexjc pt10'}>
                    <button onClick={() => {
                        // this.props.history.replace('/code', {...location.state, code_left_time: this.state.time});
                        // history.push('/member', { orders_id, bank_id });
                        this.props.create.getMember({
                            orders_id,
                            image: this.props.create.image,
                            bank_id
                        }, (res) => {
                            history.push('/success');
                        })
                    }}>已支付确认</button>
                </div>
            </div>
        );
    }
}