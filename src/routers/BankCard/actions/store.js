import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from  '../../../utils/ajax';

class BankCardStore {
    @observable list = [];
    @observable total = 0;
    @observable loading = false;
    @observable id = 'id';
    @observable filter = {
        page: 1, 
        pageSize: 10
    };

    @action async getBankCardList() { 
        this.loading = true;
        const result = await ajax.get(api.getBankCardList, { params: this.filter });
        runInAction(() => {
            this.list = result.data;
            this.total = result.total;
            this.loading = false;
        });
    }

    @action async delBankCardItem(id, cb) { 
        const result = await ajax.get(api.delBankCardItem, { params: { id } });
        cb && cb(result);
    }

    @action async addBankCardItem(params, cb) { 
        const result = await ajax.get(api.addBankCardItem, params);
        cb && cb(result);
    }
    @action async editBankCardItem(id, params, cb) { 
        const result = await ajax.get(api.editBankCardItem + '?id=' + id, params);
        cb && cb(result);
    }
}

export default BankCardStore;