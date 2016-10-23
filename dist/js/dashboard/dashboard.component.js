"use strict";

window.dashboardComponent = Vue.extend({
    /* components: {
         'menu-component': dashboardMenuComponent
     },*/
    template: "\n        <style type=\"text/css\">\n            .red {color: red;}\n            .green {color: green;}\n            .gray {color: gray;}\n        </style>\n        <h1>{{ title }}</h1>\n        <h3>\n            CONTAS Á PAGAR\n        </h3>\n        <h3>{{totalPay | currency 'R$ '}}</h3>\n        <h3>\n            CONTAS Á RECEBER\n        </h3>\n        <h3>{{totalReceive | currency 'R$ '}}</h3>\n        <menu-component></menu-component> \n        <router-view></router-view>      \n    ",
    data: function data() {
        return {
            title: "DashBoard",
            totalPay: 0,
            totalReceive: 0
        };
    },
    created: function created() {
        this.updateTotalPay();
        this.updateTotalReceive();
    },
    methods: {
        updateTotalPay: function updateTotalPay() {
            var self = this;
            Bill.total().then(function (response) {
                self.totalPay = response.data.total;
            });
        },
        updateTotalReceive: function updateTotalReceive() {
            var self = this;
            BillReceive.total().then(function (response) {
                self.totalReceive = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateTotalPay();
            this.updateTotalReceive();
        }
    }
});