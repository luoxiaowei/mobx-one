import { observable, action } from 'mobx';
import api from './api';
import ajax from  'utils/ajax';

class LoginStore {
    @observable account = '';
    @observable password = '';

    @action async postLoginSubmit(params, cb) { 
        const result = await ajax.post(api.postLoginSubmit, params);
        cb && cb(result);
    }

    @action async postLoginOut(cb) { 
        const result = await ajax.get(api.postLoginOut, {});
        cb && cb(result);
    }
}

export default LoginStore;