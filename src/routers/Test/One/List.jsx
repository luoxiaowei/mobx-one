import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
@inject('test', 'create')
@observer

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.test.getUserList();
    }

    render() {
        console.log(this.props);
        return (
            <div>list</div>
        );
    }
}