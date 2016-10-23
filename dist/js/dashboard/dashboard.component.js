"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n         <div class=\"section\">\n            <div class=\"container\">\n                <h4>{{ title }}</h4>\n                <div class=\"row\">\n                    <div class=\"col s6\">                    \n                        <div class=\"card z-depth-2 red\" >\n                            <div class=\"card-content white-text\">\n                                <p class=\"card-title\">\n                                    <p><i class=\"material-icons\">account_balance</i><strong> CONTAS Á PAGAR</strong></p>\n                                </p>\n                                <h5>{{totalPay | currency 'R$ '}}</h5>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col s6\">                        \n                         <div class=\"card z-depth-2 green\" >\n                            <div class=\"card-content white-text\">\n                                <p class=\"card-title\">                                    \n                                    <p><i class=\"material-icons\">payment</i><strong> CONTAS Á RECEBER</strong></p>\n                                </p>\n                                <h5>{{totalReceive | currency 'R$ '}}</h5>\n                            </div>\n                        </div>                                       \n                    </div>\n                </div>               \n            </div>\n        </div>          \n        \n        <menu-component></menu-component> \n        <router-view></router-view>      \n    ",
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