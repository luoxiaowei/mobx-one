import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { List, Image } from 'components/Common';

@inject('bankCard')
@observer

class Main extends Component{
	constructor (props) {
        super(props);
        this.state = { };
        this.modalKey = 1;
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '14%',
            },
            {
                title: '银行卡号',
                dataIndex: 'bank_number',
                width: '20%',
            },
            {
                title: '开户行',
                dataIndex: 'bank_name',
                width: '16%',
            },
            {
                title: '支付笔数',
                dataIndex: 'recharge_times',
                width: '14%',
            },
            {
                title: '支付总金额',
                dataIndex: 'recharge_money',
                width: '14%',
            },
            {
                title: '操作',
                render: (record) => {
                    return (
                        <div className={'operate'}>
                            <span onClick={() => this.handleEdit(record) }>编辑</span>
                            <Popconfirm
                                title={'确定删除吗？'}
                                onConfirm={() => this.handleDel(record.id)}
                                okText="确定"
                                cancelText="取消"
                            ><span>删除</span></Popconfirm>
                        </div>
                    );
                }
            }
        ];
    }

    componentDidMount() {
        this.props.bankCard.getBankCardList();
    }

    handleEdit = (info) => {

    }

    handleDel = (id) => {
        this.props.bankCard.delBankCardItem(id, () => {
            message.success('删除成功');
            this.props.bankCard.getBankCardList();
        })
    }

    render () {
        console.log(this.props, 123);
       
        const { list, total, loading, id, filter } = this.props.bankCard;
        const listProps = {
            list,
            total,
            loading, 
            page: filter.page, 
            getNextPageList: (page) => {
                this.props.bankCard.filter.page = page;
                this.props.bankCard.getBankCardList();
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
