import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { List } from 'components/Common';
import Search from './views/Search';
import AddForm from './views/AddForm';

@inject('bankCard')
@observer

class Main extends Component{
	constructor (props) {
        super(props);
        this.state = { 
            visible: false
        };
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
                width: '14%',
            },
            {
                title: '支付笔数',
                dataIndex: 'recharge_times',
                width: '12%',
            },
            {
                title: '支付总金额',
                dataIndex: 'recharge_money',
                width: '12%',
            },
            {
                title: '当日转账额度',
                dataIndex: 'max_amount',
                width: '12%',
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

    handleEdit = (formValue) => {
        this.setState({
            formValue,
            visible: true,
        });
    }

    handleDel = (id) => {
        this.props.bankCard.delBankCardItem(id, () => {
            message.success('删除成功');
            this.props.bankCard.getBankCardList();
        })
    }
    handleAdd = () => {
        this.setState({
            visible: true
        });
    }

    handleCancel = () => {
        this.setState({ 
            visible: false, 
            formValue: {} 
        });
    }

    render () {
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
        const searchProps = {
            right: <Button onClick={this.handleAdd}>添加银行卡</Button>
        };
        const addFormProps = {
            visible: this.state.visible,
            formValue: this.state.formValue,
            onCancel: this.handleCancel
        };
        return (
            <div>
                <Search {...searchProps}/>
                <List {...listProps} />
                <AddForm {...addFormProps}/>
            </div>
        );
    }
}

Main.propTypes = {

};

export default Main;
