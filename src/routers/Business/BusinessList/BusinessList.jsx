import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { List, Image } from 'components/Common';

@inject('business')
@observer

class Main extends Component{
	constructor (props) {
        super(props);
        this.state = { };
        this.modalKey = 1;
        this.columns = [
            {
                title: '商户名称',
                dataIndex: 'name',
                width: '30%',
            },
            {
                title: '商户登录账号',
                dataIndex: 'account',
                // width: '20%',
            }
        ];
    }

    componentDidMount() {
        this.props.business.getBusinessList();
    }

    handleEdit = (info) => {

    }

    handleDel = (id) => {

    }

    render () {
        console.log(this.props, 123);
        const { list, total, loading, id, filter } = this.props.business;
        const listProps = {
            list,
            total,
            loading, 
            page: filter.page, 
            getNextPageList: (page) => {
                this.props.business.filter.page = page;
                this.props.business.getBusinessList();
            },  
            id,
            columns: this.columns
        };
        return (
            <div>
                <List {...listProps} />
            </div>
        );
    }
}

Main.propTypes = {

};

export default Main;
