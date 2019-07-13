import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from "mobx-react"
@inject('test', 'create')
@observer

class Main extends Component {
    static propTypes = {
        test: PropTypes.object
    }
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
export default Main;