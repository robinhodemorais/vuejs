///ES6 Module
import './bootstrap';
import  BillPayComponent from './bill-pay/BillPay.vue';
import  BillPayListComponent from './bill-pay/BillPayList.vue';
import  BillPayCreateComponent from './bill-pay/BillPayCreate.vue';
import  BillReceiveComponent from './bill-receive/BillReceive.vue';
import  BillReceiveListComponent from './bill-receive/BillReceiveList.vue';
import  BillReceiveCreateComponent from './bill-receive/BillReceiveCreate.vue';
import  BillDashBoardComponent from './dashboard/Dashboard.vue';
import  BillComponent from './Bill.vue';

//common.js
/*require('./bootstrap');
require([
        './bill-pay/bill-pay.component',
        './bill-pay/bill-pay-list.component',
        './bill-pay/bill-pay-create.component',
        './bill-receive/bill-receive.component',
        './bill-receive/bill-receive-list.component',
        './bill-receive/bill-receive-create.component',
        './dashboard/dashboard.component',
        './bill.component'
    ], function (billPayComponent,
                 billPayListComponent,
                 billPayCreateComponent,
                 billReceiveComponent,
                 billReceiveListComponent,
                 billReceiveCreateComponent,
                 dashboardComponent,
                 billComponent) {*/
    let VueRouter = require('vue-router');
    let router = new VueRouter();
    router.map({
        '/': {
            name: 'dashboard',
            component: BillDashBoardComponent
        },
        '/bill-pays': {
            component: BillPayComponent,
            subRoutes: {
                '/': {
                    name: 'bill-pay.list',
                    component: BillPayListComponent
                },
                '/create': {
                    name: 'bill-pay.create',
                    component: BillPayCreateComponent
                },
                '/:id/update': {
                    name: 'bill-pay.update',
                    component: BillPayCreateComponent
                },
                '*': {component: BillPayListComponent}
            }
        },
        '/bill-receives': {
            component: BillReceiveComponent,
            subRoutes: {
                '/': {
                    name: 'bill-receive.list',
                    component: BillReceiveListComponent
                },
                '/create': {
                    name: 'bill-receive.create',
                    component: BillReceiveCreateComponent
                },
                '/:id/update': {
                    name: 'bill-receive.update',
                    component: BillReceiveCreateComponent
                },
                '*': {component: BillReceiveListComponent}
            }
        }
    });

    router.start({
        components: {
            'bill-component': BillComponent
        }
    }, '#app');
//quando não acha uma rota ele redireciona
    router.redirect({
        '*': '/bill-pays'
    });
