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
        this.state = { };
    }

    componentDidMount() {
        
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
            let params = { ...values };
            if (formValue.id) {
                params.id = formValue.id;
            }
            this.props.bankCard.postBankCardItem(params, () => {
                message.success('操作成功');
                this.props.onCancel && this.props.onCancel();
            });
        });

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
                title={'添加分类'}
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
                                {getFieldDecorator('bank_name', {
                                    initialValue: formValue.bank_name || '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入开户行" maxLength={100} />
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
