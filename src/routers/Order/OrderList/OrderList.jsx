import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { Image } from 'components/Common';
import { getQuery } from 'utils/utils';
import List from './views/List';
import Search from './views/Search';

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
                width: '10%',
            },
            {
                title: '转账截图',
                dataIndex: 'image',
                width: '16%',
                render: (text) => {
                    return (
                        <div className={'w12 flexcc p10'}>
                            <Image alt={text} src={text} />
                        </div>
                        
                    );
                }
            },
            {
                title: '会员号',
                dataIndex: 'user_number',
                width: '12%',
            },
            {
                title: '充值账户',
                dataIndex: 'bank_number',
                width: '20%',
                render: (text, record) => {
                    return (
                        <div className={'pl10 break'}>
                            <p>{record.name}</p>
                            <p>{record.bank_name}</p>
                            <p>{record.bank_number}</p>
                        </div>
                    );
                }
            },
            {
                title: '时间',
                dataIndex: 'create_time',
                width: '16%',
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: '14%',
                render: (text) => {
                    return (
                        <div className={'plr15'}>{this.props.order.statusOption[text]}</div>
                    );
                }
            },
        ];
    }

    componentDidMount() { 
        const { bank_number, merchant_id } = getQuery(this.props.location.search) || {};
        if (bank_number && merchant_id) {
            this.props.order.filter = {
                ...this.props.order.filter,
                bank_number, 
                merchant_id
            };
        } else {
            if (bank_number) {
                this.props.order.filter.bank_number = bank_number;
            }
            this.columns.push({
                title: '操作',
                render: (text, record) => {
                    return record.status == '0' ? (
                        <div className={'operate'}>
                            <Popconfirm
                                title={'确定充值成功吗？'}
                                onConfirm={() => this.handleChangeStatus(record.id, '1')}
                                okText="确定"
                                cancelText="取消"
                            ><span>充值成功</span></Popconfirm>
                            <Popconfirm
                                title={'确定充值失败吗？'}
                                onConfirm={() => this.handleChangeStatus(record.id, '2')}
                                okText="确定"
                                cancelText="取消"
                            ><span>充值失败</span></Popconfirm>
                        </div>
                    ) : null;
                }
            });
        }
        this.props.order.getOrderList();
    }

    componentWillReceiveProps(nextProps) {
        const { location } = nextProps;
        if (location.search != this.props.location.search) {
            const { bank_number, merchant_id } = getQuery(nextProps.location.search) || {};
            let filter = { 
                ...this.props.order.filter,
                page: 1, 
                pageSize: 10
            };
            if (bank_number && merchant_id) {
                filter = {
                    ...filter,
                    bank_number, 
                    merchant_id
                };
                if (this.columns[this.columns.length - 1].title == '操作') {
                    this.columns.pop();
                }
            } else {
                filter.bank_number && delete filter.bank_number;
                filter.merchant_id && delete filter.merchant_id;
                if (bank_number) {
                    filter.bank_number = bank_number;
                }
                if (this.columns[this.columns.length - 1].title != '操作') {
                    this.columns.push({
                        title: '操作',
                        render: (text, record) => {
                            return record.status == '0' ? (
                                <div className={'operate'}>
                                    <Popconfirm
                                        title={'确定充值成功吗？'}
                                        onConfirm={() => this.handleChangeStatus(record.id, '1')}
                                        okText="确定"
                                        cancelText="取消"
                                    ><span>充值成功</span></Popconfirm>
                                    <Popconfirm
                                        title={'确定充值失败吗？'}
                                        onConfirm={() => this.handleChangeStatus(record.id, '2')}
                                        okText="确定"
                                        cancelText="取消"
                                    ><span>充值失败</span></Popconfirm>
                                </div>
                            ) : null;
                        }
                    });
                }
                
            }
            this.props.order.filter = filter;
            this.props.order.getOrderList();
        }
    }

    componentWillUnmount() {
        this.props.order.filter = {
            page: 1, 
            pageSize: 10
        }
    }

    handleChangeStatus = (id, status) => {
        this.props.order.getOrderChangeStatus({
            id, 
            status
        }, () => {
            this.props.order.getOrderList();
        })
    }

    render () {
        const { list, total, loading, id, filter, success_amount, fail_amount } = this.props.order;
        
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
                <Search />
                <div className={'cmain pr20 fs16 pb15'}>
                    <span className={'pr30'}>支付成功金额：¥ {success_amount}</span>
                    <span>支付失败金额：¥ {fail_amount}</span>
                </div>
                <List {...listProps} />
            </div>
        );
    }
}

Main.propTypes = {

};

export default Main;
