import { observable, action, runInAction } from 'mobx';
import { Toast } from 'components';
import api from './api';
import ajax from  'utils/ajax';

class CreateStore {
    @observable amount = '';
    @observable image = '';
    @observable user_number = '';

    @action async getOrder(id, cb) { 
        if (!this.amount) {
            return Toast.info('请输入存款金额');
        }
        if (!this.user_number) {
            return Toast.info('请输入会员帐号');
        }
        const result = await ajax.post(api.getOrder,{ amount: this.amount, id, user_number: this.user_number } );
        cb && cb(result);
    }
    @action async getCode(params, cb) { 
        const result = await ajax.get(api.getCode, { params });
        cb && cb(result);
    }
    @action async getMember(params, cb) { 
        const result = await ajax.post(api.getMember, params);
        cb && cb(result);
    }
}

export default CreateStore;