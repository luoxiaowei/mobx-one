import React, { Component } from 'react';
import { observer, inject } from "mobx-react"
@inject('test')
@observer

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                two
            </div>
        );
    }
}
export default Main;