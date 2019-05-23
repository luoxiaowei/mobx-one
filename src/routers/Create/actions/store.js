import { observable, action, runInAction } from 'mobx';

class CreateStore {
    @observable list = [];
}

export default CreateStore;