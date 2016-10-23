'use strict';

var router = new VueRouter();
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
            } /*,
              'bill-receives': {
                 name: 'bill-receive',
                 component: billReceiveComponent
              }*/
            , '*': { component: billPayListComponent }
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
            '*': { component: billReceiveListComponent }
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