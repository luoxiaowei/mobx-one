import React from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, Button } from 'antd';
const FormItem = Form.Item;

@inject('stat')
@observer

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    handleSubmit = () => {
        this.props.stat.getStatList();
        this.props.onOk && this.props.onOk();
    }
    handleChange = (e) => {
        this.props.stat.filter.text = e.target.value;
    }
    componentWillUnmount() {
        this.props.stat.filter.text = '';
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
                <Row>
                    <Col span={10}>
                        <FormItem { ...formItemLayout }>
                            {getFieldDecorator('text', {
                                initialValue: filter.text || '',
                                rules: [{ required: false }]
                            })(
                                <Input 
                                    placeholder="请输入" 
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
                    <Col span={8}>
                        <div style={{ paddingTop: 4 }} className={'pl10'}>
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
