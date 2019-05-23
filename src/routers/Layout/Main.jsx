import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <div className={'test'}/>
                <div>月份layout layout layout layout layout layout</div>
                <Link to={'/one'}>one</Link><br/>
                <Link to={'/two'}>two</Link><br/>
                <Link to={'/create'}>create</Link><br/>
                {children}
            </div>
        );
    }
}