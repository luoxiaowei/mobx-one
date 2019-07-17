import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from  '../../../utils/ajax';

class OrderStore {
    @observable list = [];
    @observable total = 0;
    @observable loading = false;
    @observable success_amount = 0;
    @observable fail_amount = 0;
    @observable id = 'id';
    @observable filter = {
        page: 1, 
        pageSize: 10
    };
    @observable statusOption = {
        '0': '审核中',
        '1': '充值成功', 
        '2': '充值失败'
    };
    @action async getOrderList() { 
        this.loading = true;
        const result = await ajax.get(api.getOrderList, { params: this.filter });
        runInAction(() => {
            this.list = result.data;
            this.total = result.total;
            this.success_amount = result.success_amount;
            this.fail_amount = result.fail_amount;
            this.loading = false;
        });
    }
    @action async getOrderChangeStatus(params, cb) { 
        const result = await ajax.get(api.getOrderChangeStatus, { params: params });
        cb && cb(result);
    }
}

export default OrderStore;