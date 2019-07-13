import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from  '../../../utils/ajax';

class BusinessStore {
    @observable list = [];
    @observable total = 0;
    @observable loading = false;
    @observable id = 'id';
    @observable filter = {
        page: 1, 
        pageSize: 10
    };

    @action async getBusinessList() { 
        this.loading = true;
        const result = await ajax.get(api.getBusinessList, { params: this.filter });
        runInAction(() => {
            this.list = result.data;
            this.total = result.total;
            this.loading = false;
        });
    }
}

export default BusinessStore;