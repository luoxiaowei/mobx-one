import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export const SlotContext = React.createContext();
export default class Main extends Component {
    static propTypes = {
        children: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    // static childContextTypes = {
    //     color: PropTypes.string
    // }

    // getChildContext() {
    //     return {
    //         color: "123"
    //     };
    // }

    render() {
        const { children } = this.props;
        return (
            <SlotContext.Provider value={{ cc: '123', cca: '123' }}>
                
                <div className={'test'}/>
                <div className={'test2'}/>
                <div>月份layout layout layout layout layout layout</div>
                <Link to={'/one'}>one</Link><br/>
                <Link to={'/two'}>two</Link><br/>
                <Link to={'/create'}>create1</Link><br/>
                
                { children }
            </SlotContext.Provider>
        );
    }
}