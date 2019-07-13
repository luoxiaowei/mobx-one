import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from  '../../../utils/ajax';

class OrderStore {
    @observable list = [];
    @observable total = 0;
    @observable loading = false;
    @observable id = 'id';
    @observable filter = {
        page: 1, 
        pageSize: 10
    };

    @action async getOrderList() { 
        this.loading = true;
        const result = await ajax.get(api.getOrderList, { params: this.filter });
        runInAction(() => {
            this.list = result.data;
            this.total = result.total;
            this.loading = false;
        });
    }
}

export default OrderStore;