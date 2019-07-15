import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { List, Image } from 'components/Common';
import Search from './views/Search';
import AddForm from './views/AddForm';

@inject('business')
@observer

class Main extends Component{
	constructor (props) {
        super(props);
        this.state = { 
            formValue: {},
            visible: false
        };
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
        this.props.business.getBusinessList();
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
        const searchProps = {
            right: <Button onClick={this.handleAdd}>添加商户</Button>
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
