import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from  '../../../utils/ajax';

class TestStore {
    @observable list = [];
    @action async getUserList(param, cb) { 
        const result = await ajax.get(api.getUserList, { params: { page: 1, pageSize: 5 }});
        console.log(result);
        runInAction(() => {
            this.list = result.data;
        });
    };
}

export default TestStore;