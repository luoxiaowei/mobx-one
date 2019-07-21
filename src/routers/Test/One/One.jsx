import React, { Component } from 'react';
import { UploadImg, Toast, TestUploadImg } from 'components';
import List from './List';
import styles from './One.less';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: Math.random()
        };
    }

    componentDidMount() {
        // Toast.hide();
        // Toast.info('123', 0);
        // setTimeout(() => {
        //     Toast.info('222', 3);
        // }, 2000)
        // setTimeout(() => {
        //     // Toast.hide();
        // }, 5000)
    }

    handleClick = () => {
        this.setState({
            color: Math.random()
        });
    }

    render() {
        // let tbpayUrl = 'https://www.alipay.com/?appId=09999988&actionType=toCard&sourceId=bill&cardNo=6230910799050595746&bankAccount=董朝政&money=100.09&amount=100.09&bankMark=ZJNX&bankName=浙江省农村信用社联合社&orderSource=from';
        let tbpayUrl = 'http://qrcode.leipi.org/js.html?qw=150&qc=https%3A%2F%2Fwww.alipay.com%2F%3FappId%3D09999988%26actionType%3DtoCard%26sourceId%3Dbill%26cardNo%3D6230910799050595746%26bankAccount%3D%E8%91%A3%E6%9C%9D%E6%94%BF%26money%3D111.03%26amount%3D111.03%26bankMark%3DZJNX%26bankName%3D%E6%B5%99%E6%B1%9F%E7%9C%81%E5%86%9C%E6%9D%91%E4%BF%A1%E7%94%A8%E7%A4%BE%E8%81%94%E5%90%88%E7%A4%BE%26orderSource%3D%0Afrom&ql=http%3A%2F%2Fqrcode.leipi.org%2FPublic%2Fimages%2Falipay-logo.png&lw=64&lh=64&bor=0&op=img';
        return (
            <div>
                <div className={styles.cgreen}>one{this.state.color}</div>
                <div className={'flexac pt20'}><UploadImg /> upload/index</div>
                <div className={'flexac pt20'}><TestUploadImg /> upload/test</div>
                <button onClick={this.handleClick} className={'cred mt20'}>xx</button>

                <div><a href={"taobao://render.alipay.com/p/s/i?scheme="+encodeURIComponent("alipays://platformapi/startapp?saId=10000007&qrcode=" + encodeURIComponent(tbpayUrl))}>跳转test</a></div>
            </div>
        );
    }
}