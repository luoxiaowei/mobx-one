import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from "mobx-react";
import {SlotContext} from '../../Layout/Main';
@inject('test', 'create')
@observer

class Main extends Component {
    static propTypes = {
        test: PropTypes.object
    }
    // static contextTypes = {
    //     color: PropTypes.string
    // }
    constructor(props, context) {
        super(props, context);
        console.log(props, context);
        this.state = {};
    }
    componentDidMount() {
        // this.props.test.getUserList();
    }

    render() {
        console.log(this.props, this.context);
        return (
            <SlotContext.Consumer>{context => {
                console.log(context);
                return (<div>list</div>)
            }}</SlotContext.Consumer>
        );
    }
}

export default Main;