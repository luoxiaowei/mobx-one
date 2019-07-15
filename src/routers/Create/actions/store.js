import { observable, action, runInAction } from 'mobx';
import api from './api';
import ajax from  'utils/ajax';

class CreateStore {
    @observable amount = '';
    @observable image = '';
    @observable user_number = '';

    @action async getOrder(cb) { 
        const result = await ajax.post(api.getOrder,{ amount: this.amount } );
        cb && cb(result);
    }
    @action async getCode(params, cb) { 
        const result = await ajax.get(api.getCode, { params });
        console.log(result, 123);
        cb && cb(result);
    }
    @action async getMember(params, cb) { 
        const result = await ajax.post(api.getMember, params);
        cb && cb(result);
    }
}

export default CreateStore;