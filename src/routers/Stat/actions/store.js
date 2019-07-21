import { observable, action, runInAction } from 'mobx';
import ajax from  'utils/ajax';
import api from './api';

class StatStore {
    @observable list = [];
    @observable total = 0;
    @observable loading = false;
    @observable id = 'id';
    @observable filter = {
        page: 1, 
        pageSize: 10
    };

    @action async getStatList() { 
        this.loading = true;
        const result = await ajax.get(api.getStatList, { params: this.filter });
        runInAction(() => {
            let list = [];
            result.data.map((item, index) => {
                list.push({
                    ...item,
                    row: item.bank.length || 1,
                    ...(item.bank[0] || {})
                });
                if (item.bank && item.bank.length) {
                    item.bank.map((it, i) => {
                        if (i != 0) {
                            list.push({ ...item, ...it, row: 0 });
                        }
                        
                    })
                }
            });
            this.list = list;
            this.total = result.total;
            this.loading = false;
        });
    }
}

export default StatStore;