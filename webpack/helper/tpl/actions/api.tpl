
export default {
<% keys.forEach((key) => { _%>
    <%=commonAjaxMethod['List']%><%= name %><%= key %>: '/api',
<% }) _%>
};