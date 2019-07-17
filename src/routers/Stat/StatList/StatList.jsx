import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Row, Col } from 'antd';
import { List } from 'components/Common';
import Search from './views/Search';

@inject('stat')
@observer

class Main extends Component{
	constructor (props) {
        super(props);
        this.columns = [
            {
                title: '商户名称',
                dataIndex: 'merchant_name',
                width: '16%',
                render: (value, row, index) => {
                    return {
                        children: value,
                        props: {
                            rowSpan: row.row
                        }
                    }
                }
            },
            {
                title: '开户行',
                dataIndex: 'bank_name',
                width: '16%'
            },
            {
                title: '银行卡号',
                dataIndex: 'bank_number',
                width: '22%',
            },
            {
                title: '支付笔数',
                dataIndex: 'recharge_times',
                width: '14%'
            },
            {
                title: '支付总金额',
                dataIndex: 'recharge_money',
                width: '16%'
            },
            {
                title: '当日转账额度',
                dataIndex: 'max_amount',
                // width: '12%'
            },
        ];
    }

    componentDidMount() {
        this.props.stat.getStatList();
    }

    render () {
        const { list, total, loading, id, filter } = this.props.stat;
        const listProps = {
            list,
            total,
            loading, 
            page: filter.page, 
            getNextPageList: (page) => {
                this.props.stat.filter.page = page;
                this.props.stat.getStatList();
            },  
            id,
            columns: this.columns
        };
        return (
            <div>
                <Search />
                <List {...listProps} />
            </div>
        );
    }
}

Main.propTypes = {

};

export default Main;
