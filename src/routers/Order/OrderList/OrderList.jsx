import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { Image } from 'components/Common';
import List from './views/List';

@inject('order')
@observer

class Main extends Component{
	constructor (props) {
        super(props);
        this.state = { };
        this.modalKey = 1;
        this.columns = [
            {
                title: '充值金额',
                dataIndex: 'amount',
                width: '16%',
            },
            {
                title: '转账截图',
                dataIndex: 'image',
                width: '30%',
                return: (text) => {
                    return (
                        <img src={text} />
                    );
                }
            },
            {
                title: '充值账户',
                dataIndex: 'bank_number',
                width: '24%',
            },
            {
                title: '时间',
                dataIndex: 'time',
                // width: '20%',
            }
        ];
    }

    componentDidMount() {
        this.props.order.getOrderList();
    }

    handleEdit = (info) => {

    }

    handleDel = (id) => {

    }

    render () {
        console.log(this.props, 123);
        const { list, total, loading, id, filter } = this.props.order;
        const listProps = {
            list,
            total,
            loading, 
            filter,
            page: filter.page, 
            getNextPageList: (page) => {
                this.props.order.filter.page = page;
                this.props.order.getOrderList();
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
