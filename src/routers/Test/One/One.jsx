import React, { Component } from 'react';
import { UploadImg, Toast } from 'components';
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
        return (
            <div>
                <div className={styles.cgreen}>one{this.state.color}</div>
                <UploadImg />
                <button onClick={this.handleClick} className={'cred'}>xx</button>
            </div>
        );
    }
}