import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    static propTypes = {
        children: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className={'test'}/>
                <div className={'test2'}/>
                <div>月份layout layout layout layout layout layout</div>
                <Link to={'/one'}>one</Link><br/>
                <Link to={'/two'}>two</Link><br/>
                <Link to={'/create'}>create1</Link><br/>
                { children }
            </div>
        );
    }
}