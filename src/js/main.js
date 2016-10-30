require('jquery');
require('materialize-css');
/*cria uma instancia global do vuejs*/
window.Vue = require('vue');
require('vue-resource');
/*<script type="text/javascript" src="node_modules/jquery/dist/jquery.min.js"></script>
    <script src="node_modules/materialize-css/dist/js/materialize.min.js"></script>
    <script type="text/javascript" src="node_modules/vue/dist/vue.min.js"></script>
    <script type="text/javascript" src="node_modules/vue-router/dist/vue-router.min.js"></script>
    <script type="text/javascript" src="node_modules/vue-resource/dist/vue-resource.min.js"></script>
*/
require('../sass/app.scss');
require('./filters');
require('./resources');
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
                 billComponent) {
    let VueRouter = require('vue-router');
    let router = new VueRouter();
    router.map({
        '/': {
            name: 'dashboard',
            component: dashboardComponent
        },
        '/bill-pays': {
            component: billPayComponent,
            subRoutes: {
                '/': {
                    name: 'bill-pay.list',
                    component: billPayListComponent
                },
                '/create': {
                    name: 'bill-pay.create',
                    component: billPayCreateComponent
                },
                '/:id/update': {
                    name: 'bill-pay.update',
                    component: billPayCreateComponent
                },
                '*': {component: billPayListComponent}
            }
        },
        '/bill-receives': {
            component: billReceiveComponent,
            subRoutes: {
                '/': {
                    name: 'bill-receive.list',
                    component: billReceiveListComponent
                },
                '/create': {
                    name: 'bill-receive.create',
                    component: billReceiveCreateComponent
                },
                '/:id/update': {
                    name: 'bill-receive.update',
                    component: billReceiveCreateComponent
                },
                '*': {component: billReceiveListComponent}
            }
        }
    });

    router.start({
        components: {
            'bill-component': billComponent
        }
    }, '#app');
//quando não acha uma rota ele redireciona
    router.redirect({
        '*': '/bill-pays'
    });
});
console.log('teste');