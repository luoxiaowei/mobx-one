import { observable, action, runInAction } from 'mobx';

class <%= name %>Store {
<% keys.forEach((key) => { _%>
<% if(views[key] == 'List') { _%> 
    @observable <%= (key.slice(0, -4) + 'List').replace(/[A-Z]/, s => s.toLowerCase()) %> = [];
    @observable <%= (key.slice(0, -4) + 'Total').replace(/[A-Z]/, s => s.toLowerCase()) %> = 0;
    @observable <%= (key.slice(0, -4) + 'Filter').replace(/[A-Z]/, s => s.toLowerCase()) %> = {
        page: 1,
        pageSize: 10
    };
<% } _%>
<% }) _%>

<% keys.forEach((key) => { _%>
<% if(views[key] == 'List') { _%> 
   @action async <%=commonAjaxMethod['List']%><%= name %><%= key %>(cb) { 
        const result = await ajax.get(api.get<%= name %><%= key %>, { params: this.<% if(key == 'List') { %>filter <% } else { %><%= key.replace(/[A-Z]/, s => s.toLowerCase()) %>Filter <% } _%>});
        runInAction(() => {
            this.<%= (key.slice(0, -4) + 'List').replace(/[A-Z]/, s => s.toLowerCase()) %>  = result.data.list;
            this.<%= (key.slice(0, -4) + 'Total').replace(/[A-Z]/, s => s.toLowerCase()) %> = result.data.total;
        });
        cb && cb();
    }; 
<% } _%>
<% }) _%>
    
}

export default <%= name %>Store;