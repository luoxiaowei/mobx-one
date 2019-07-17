import React, {Component} from 'react';
import { observer, inject } from "mobx-react";
import { Popconfirm, message, Button } from 'antd';
import { List, Copy } from 'components/Common';
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
        this.copy = {};
        this.modalKey = 1;
        this.columns = [
            {
                title: '商户名称',
                dataIndex: 'name',
                width: '20%',
            },
            {
                title: '商户登录账号',
                dataIndex: 'account',
                width: '16%',
            },
            {
                title: '权限',
                dataIndex: 'is_supper',
                width: '14%',
                render: (text) => {
                    return (
                        <div>
                            {text == 1 ? '超级管理员' : '--' }
                        </div>
                    );
                }
            },
            {
                title: '是否停用',
                dataIndex: 'is_close',
                width: '14%',
                render: (text) => {
                    return (
                        <div>{text == 1 ? '停用' : '正常'}</div>
                    );
                }
            },
            {
                title: '操作',
                render: (record) => {
                    let text = record.is_close == 1 ? '启用' : '停用'
                    return (
                        <div className={'operate'}>
                            <span onClick={() => this.handleEdit(record) }>编辑</span>
                            <Popconfirm
                                title={'确定' + text + '吗？'}
                                onConfirm={() => this.handleDel(record.id)}
                                okText="确定"
                                cancelText="取消"
                            ><span>{text}</span></Popconfirm>
                            <span onClick={() => {
                                this.copy[record.id].handleCopy();
                            }}>
                                <span style={{ opacity: 0, position: 'fixed', zIndex: -1 }}>
                                    <Copy 
                                        ref={ref => this.copy[record.id] = ref} 
                                        copyText={record.url}
                                        callback={(status, msg) => {
                                            if (status) {
                                                message.success('复制成功');
                                            } else {
                                                message.error('复制失败');
                                            }
                                        }}
                                    />
                                </span>
                                复制支付链接
                            </span>
                        </div>
                    );
                }
            }
        ];
    }

    componentDidMount() {
        this.props.business.getBusinessList();
    }

    componentWillUnmount() {
        this.props.business.filter = {
            page: 1, 
            pageSize: 10
        }
    }

    handleEdit = (formValue) => {
        this.setState({
            formValue,
            visible: true,
        });
    }

    handleDel = (id) => {
        this.props.business.delBusinessItem(id, () => {
            message.success('操作成功');
            this.props.business.getBusinessList();
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
                {this.state.visible && <AddForm {...addFormProps}/>}
            </div>
        );
    }
}

Main.propTypes = {

};

export default Main;
