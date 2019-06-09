import React, { Component } from 'react';

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
    }

    handleClick = () => {
        this.setState({
            color: Math.random()
        })
    }

    render() {
        return (
            <div>
                <div className={styles.cgreen}>one{this.state.color}</div>
                <List/>
                <button onClick={this.handleClick} className={'cred'}>btn</button>
            </div>
        );
    }
}