window.dashboardComponent = Vue.extend({
   /* components: {
        'menu-component': dashboardMenuComponent
    },*/
    template: `
        <style type="text/css">
            .red {color: red;}
            .green {color: green;}
            .gray {color: gray;}
        </style>
        <h1>{{ title }}</h1>
        <h3>
            CONTAS Á PAGAR
        </h3>
        <h3>{{totalPay | currency 'R$ '}}</h3>
        <h3>
            CONTAS Á RECEBER
        </h3>
        <h3>{{totalReceive | currency 'R$ '}}</h3>
        <menu-component></menu-component> 
        <router-view></router-view>      
    `,
    data: function(){
        return {
            title: "DashBoard",
            totalPay: 0,
            totalReceive: 0
        };
    },
    created: function () {
        this.updateTotalPay();
        this.updateTotalReceive();
    },
    methods: {
        updateTotalPay: function () {
            let self = this;
            Bill.total().then(function (response) {
                self.totalPay = response.data.total;
            });
        },
        updateTotalReceive: function () {
            let self = this;
            BillReceive.total().then(function (response) {
                self.totalReceive = response.data.total;
            });
        }
    },
    events: {
        'change-info': function () {
            this.updateTotalPay();
            this.updateTotalReceive();
        }
    }
});
