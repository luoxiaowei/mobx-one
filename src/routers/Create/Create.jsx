import React, { Component } from 'react';

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
        return (
            <div style={{ height: 2000 }} className={'flexac flex w1'}>
                create哈哈
            </div>
        );
    }
}