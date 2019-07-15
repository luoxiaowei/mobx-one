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
    getTitle = (key) => {
        const { routers } = this.props;
        let title = '';
        const run = (list, pid) => {
            list.forEach(item => {
                if(key == item.path) {
                    title = item.title;
                }
                if (item.childs && item.childs.length > 0) {
                    run(item.childs, item.path);
                }
            })
        }
        run(routers);
        return title;
    }
    render() {
        const { children, location } = this.props;
        return (
            <div>
                <div className={'header'}>
                    {this.getTitle(location.pathname)}
                </div>
                { children }
            </div>
        );
    }
}

Main.defaultProps = {
    title: ''
};