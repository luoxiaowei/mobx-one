import React from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Modal, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

@inject('business')
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
                this.props.business.editBusinessItem(formValue.id, params, () => {
                    message.success('操作成功');
                    this.props.onCancel && this.props.onCancel();
                });
            } else {
                this.props.business.addBusinessItem(params, () => {
                    message.success('操作成功');
                    this.props.onCancel && this.props.onCancel();
                });
            }
            
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
                title={formValue.id ? '编辑商户' : '添加商户'}
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={'确定'}
                cancelText={'取消'}
            >
                <Form>
                    <Row>
                        <Col span={24}>
                            <FormItem label={'商户名称'} { ...formItemLayout }>
                                {getFieldDecorator('name', {
                                    initialValue: formValue.name || '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入商户名称" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'商户登录账号'} { ...formItemLayout }>
                                {getFieldDecorator('account', {
                                    initialValue: formValue.account || '',
                                    rules: [{ required: true, message: '不能为空' }]
                                })(
                                    <Input placeholder="请输入商户登录账号" maxLength={100} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem label={'密码'} { ...formItemLayout }>
                                {getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [{ required: !formValue.id, message: '不能为空' }]
                                })(
                                    <Input placeholder={formValue.id ? '如要更改，请输入密码' : '请输入密码'} maxLength={100} />
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
