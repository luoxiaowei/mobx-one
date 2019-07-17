import React from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@inject('order')
@observer

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    handleSubmit = () => {
        this.props.order.getOrderList();
        this.props.onOk && this.props.onOk();
    }

    handleChangeTime = (date, dateString) => {
        this.props.order.filter.start_time = dateString[0];
        this.props.order.filter.end_time = dateString[1];
    }

    handleChange = (e) => {
        this.props.order.filter.text = e.target.value;
    }
    componentWillUnmount() {
        this.props.order.filter.text = '';
        this.props.order.filter.start_time = '';
        this.props.order.filter.end_time = '';
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { filter, right } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            colon: false
        };
        return (
            <Form>
                <Row gutter={24}>
                    <Col span={7}>
                        <FormItem { ...formItemLayout }>
                            {getFieldDecorator('text', {
                                initialValue: filter.text || '',
                                rules: [{ required: false }]
                            })(
                                <Input 
                                    placeholder="请输入订单号/会员号" 
                                    onChange={this.handleChange} 
                                    maxLength={100}
                                    onKeyUp={e => {
                                        if (e.keyCode == 13) {
                                            this.handleSubmit();
                                        }
                                    }}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem { ...formItemLayout }>
                            {getFieldDecorator('time', {
                                initialValue: filter.time || '',
                                rules: [{ required: false }]
                            })(
                                <RangePicker
                                    showTime={{ format: 'HH:mm:ss' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={['开始时间', '结束时间']}
                                    onChange={this.handleChangeTime}
                                    style={{ width: '100%' }}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <div style={{ paddingTop: 4 }}>
                            <Button onClick={this.handleSubmit}>搜索</Button>
                        </div>
                    </Col>
                    <Col span={6} >
                        <div style={{ paddingTop: 4 }} className={'flexje'}>
                            {right && right}
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}
Search.propTypes = {
    filter: PropTypes.object,
};
Search.defaultProps = {
    filter: {

    }
};
export default Form.create()(Search);