import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Row, Col } from 'antd';
import history from 'utils/history';
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
                width: '14%',
                render: (value, row, index) => {
                    return {
                        children: (
                            <div>
                                <p>{value}</p>
                                <p className={'cmain'}>支付总金额：¥ {row.total_amount}</p>
                            </div>
                        ),
                        props: {
                            rowSpan: row.row
                        }
                    }
                }
            },
            {
                title: '开户行',
                dataIndex: 'bank_name',
                width: '14%'
            },
            {
                title: '银行卡号',
                dataIndex: 'bank_number',
                width: '20%',
            },
            {
                title: '支付笔数',
                dataIndex: 'recharge_times',
                width: '12%'
            },
            {
                title: '支付总金额',
                dataIndex: 'recharge_money',
                width: '14%'
            },
            {
                title: '当日转账额度',
                dataIndex: 'max_amount',
                width: '12%'
            },
            {
                title: '操作',
                render: (record) => {
                    return (
                        <div className={'operate'}>
                            <span onClick={() => this.handleLook(record) }>查看订单</span>
                        </div>
                    );
                }
            }
        ];
    }

    componentDidMount() {
        this.props.stat.getStatList();
    }

    componentWillUnmount() {
        this.props.stat.filter = {
            page: 1, 
            pageSize: 10
        }
    }

    handleLook = (record) => {
        const { bank_number, merchant_id } = record;
        history.push('/orderList?bank_number=' + bank_number + '&merchant_id=' + merchant_id);
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
