import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin, Pagination, message } from 'antd';

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.columns = props.columns;
        this.copy = {};
    }
    render() {
        const { list, loading, total, getNextPageList, id, isPagination, rowSelection, filter } = this.props;
        const pagination = {
            pageSize: 10,
            showQuickJumper: true,
            current: filter.page,
            total: total,
            showTotal: (total) => {
                return <p className='l'>共 <b>{total}</b> 条</p>;
            },
            onChange: (page, pageSize) => {
                getNextPageList(page, pageSize);
            }
        };
        // console.log(pagination, 999);
        if (!Array.isArray(list)) {
            return <div className={'tc'}>数据格式有误</div>;
        }
        return (
            <Spin tip="正在加载数据..." spinning={loading}>
                <div className={'flex'}>
                    {this.columns.map((item, index) => {
                        return (
                            <div key={'header' + index} className={`tl ${(index + 1) == this.columns.length && 'col'}`} style={{ width: item.width, background: '#fafafa', padding: '16px 16px' }}>{item.title}</div>
                        );
                    })}
                </div>
                <div className={'pt10'}>
                    {list.map((record, i) => {
                        return (
                            <div key={'tr' + i} className={'mb10'} style={{ border: '1px solid #e8e8e8', borderRight: 'none' }}>
                                <div className={'p10'} style={{ background: '#eee' }}>
                                    <span className={'fs16 pr10'}>订单号: 
                                        {record.orders_sn}
                                    </span>
                                </div>
                                <div className={'flex'}>
                                    {this.columns.map((item, index) => {
                                        return (
                                            <div key={'tr' + i + 'td' + index} className={`tl flexac ${(index + 1) == this.columns.length && 'col'}`} style={{ width: item.width, borderRight: '1px solid #e8e8e8' }}>
                                                {item.render ? item.render(record[item.dataIndex], record) : <div style={{ padding: '16px' }} className={'h100 flexac'}><span>{record[item.dataIndex]}</span></div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={'flexje'}>
                    <Pagination {...pagination} />
                </div>
            </Spin>
        );
    }

}

OrderList.propTypes = {
    // list: PropTypes.array,
    total: PropTypes.number,
    loading: PropTypes.bool,
    getNextPageList: PropTypes.func,
    id: PropTypes.string,
    columns: PropTypes.array,
    isPagination: PropTypes.bool
};

OrderList.defaultProps = {
    list: [],
    total: 0,
    loading: false,
    getNextPageList: () => {},
    id: '',
    columns: [],
    isPagination: true,
    rowSelection: undefined
};

export default OrderList;
