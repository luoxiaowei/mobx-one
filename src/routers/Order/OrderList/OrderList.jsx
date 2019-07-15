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
                width: '12%',
            },
            {
                title: '转账截图',
                dataIndex: 'image',
                width: '18%',
                render: (text) => {
                    return (
                        <Image alt={text} src={text} />
                    );
                }
            },
            {
                title: '会员号',
                dataIndex: 'bank_number',
                width: '14%',
            },
            {
                title: '充值账户',
                dataIndex: 'bank_number',
                width: '14%',
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
            {
                title: '操作',
                render: (text, record) => {
                    return record.status == '0' ? (
                        <div className={'operate'}>
                            <Popconfirm
                                title={'确定通过吗？'}
                                onConfirm={() => this.handleChangeStatus(record.id, '1')}
                                okText="确定"
                                cancelText="取消"
                            ><span>通过</span></Popconfirm>
                            <Popconfirm
                                title={'确定拒绝吗？'}
                                onConfirm={() => this.handleChangeStatus(record.id, '2')}
                                okText="确定"
                                cancelText="取消"
                            ><span>拒绝</span></Popconfirm>
                        </div>
                    ) : null;
                }
            }
        ];
    }

    componentDidMount() {
        this.props.order.getOrderList();
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
