import React from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Modal, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

@inject('bankCard')
@observer

class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
            obj: {}
        };
    }

    componentDidMount() {
        this.props.bankCard.getBankList((res) => {
            let keys = Object.keys(res.data);
            this.setState({
                data: keys.map(item => ({ ...res.data[item], id: item })),
                obj: res.data
            });
        });
    }

    handleCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }

    handleOk = () => {
        const { validateFields } = this.props.form;
        const { formValue } = this.props;
        validateFields((err, values) => {
            if (err) {
                return;
            }
            let params = { ...values, bank_name: this.state.obj[values.bank_sign].bank_name };
            if (formValue.id) {
                this.props.bankCard.editBankCardItem(formValue.id, params, () => {
                    message.success('操作成功');
                    this.props.bankCard.getBankCardList();
                    this.props.onCancel && this.props.onCancel();
                });
            } else {
                this.props.bankCard.addBankCardItem(params, () => {
                    message.success('操作成功');
                    this.props.bankCard.getBankCardList();
                    this.props.onCancel && this.props.onCancel();
                });
            }
            
        });

    }

    handleClickSeclect = () => {
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formValue, visible } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
            colon: false
        };
        return (
            <Modal
                title={formValue.id ? '编辑银行卡' : '添加银行卡'}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={'确定'}
                cancelText={'取消'}
            >
                <Form>
                    <Row>
                        <Col span={24}>
                            <FormItem label={'姓名'} { ...formItemLayout }>
                                {getFieldDecorator('name', {
                                    initialValue: formValue.name || '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入姓名" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'开户行'} { ...formItemLayout }>
                                {getFieldDecorator('bank_sign', {
                                    initialValue: formValue.bank_sign || undefined,
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Select 
                                        placeholder="请选择开户行"
                                        maxLength={100}
                                        onClick={this.handleClickSeclect}
                                    >
                                        {this.state.data.map(item => {
                                            return (
                                                <Option value={item.id} key={item.id}>{item.bank_name}</Option>
                                            );
                                        })}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'银行卡号'} { ...formItemLayout }>
                                {getFieldDecorator('bank_number', {
                                    initialValue: formValue.bank_number || '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入银行卡号" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'当日转账额度'} { ...formItemLayout }>
                                {getFieldDecorator('max_amount', {
                                    initialValue: formValue.max_amount || '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入当日转账额度" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'支付宝ID'} { ...formItemLayout }>
                                {getFieldDecorator('card_id', {
                                    initialValue: formValue.card_id || '',
                                    rules: [{ required: false, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入支付宝ID" />
                                )}
                                <span>添加ID自动隐藏，不添加不隐藏, <a target={'_blank'} href={'http://t.wwei.cn/index-wenan-view.html?id=76'} className={'cmain'}>获取ID教程</a></span>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
AddForm.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    formValue: PropTypes.object,
};
AddForm.defaultProps = {
    isEdit: false,
    formValue: {}
};
export default Form.create()(AddForm);
