Vue.http.options.root = 'http://192.168.10.10:8000/api';
//cria uma variavel de forma global
let BillResource = window.Bill = Vue.resource('bills{/id}',{},{
    total: {method: 'GET', url: 'bills/total'}
});

//cria uma variavel de forma global
let BillResourceReceive = Vue.resource('billsReceive{/id}',{},{
    total: {method: 'GET', url: 'billsReceive/total'}
});

export {BillResource,BillResourceReceive};