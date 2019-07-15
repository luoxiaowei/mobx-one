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

    @action async delBusinessItem(id, cb) { 
        const result = await ajax.get(api.delBusinessItem, { params: { id } });
        cb && cb(result);
    }

    @action async addBusinessItem(params, cb) { 
        const result = await ajax.post(api.addBusinessItem, params);
        cb && cb(result);
    }
    @action async editBusinessItem(id, params, cb) { 
        const result = await ajax.post(api.editBusinessItem + '?id=' + id, params);
        cb && cb(result);
    }
}

export default BusinessStore;