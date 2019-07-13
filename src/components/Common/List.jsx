import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.columns = props.columns;
    }
    render() {
        const { list, loading, total, getNextPageList, id, isPagination, rowSelection, page, pageSize } = this.props;
        const pagination = {
            pageSize,
            showQuickJumper: true,
            total: total,
            showTotal: (total) => {
                return <p className='l'>共 <b>{total}</b> 条</p>;
            },
            onChange: (page, pageSize) => {
                getNextPageList(page, pageSize);
            }
        };
        if (page) {
            pagination.current = page;
        }
        if (!Array.isArray(list)) {
            return <div className={'tc'}>数据格式有误</div>;
        }
        return (
            <Spin tip="正在加载数据..." spinning={loading}>
                <Table
                    className={'table'}
                    dataSource={list}
                    columns={this.columns}
                    bordered
                    pagination={isPagination ? pagination : false}
                    rowKey={record => record[id] + ''}
                    rowSelection={rowSelection}
                />
            </Spin>
        );
    }

}

List.propTypes = {
    // list: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    getNextPageList: PropTypes.func,
    id: PropTypes.string,
    columns: PropTypes.array,
    isPagination: PropTypes.bool
};

List.defaultProps = {
    list: [],
    total: 0,
    loading: false,
    getNextPageList: () => {},
    id: '',
    columns: [],
    isPagination: true,
    rowSelection: undefined,
    pageSize: 10
};

export default List;
