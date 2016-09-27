'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n        <style type="text/css">\n            .red {color: red;}\n            .green {color: green;}\n            .gray {color: gray;}\n            .existeConta {color: red;}\n            .nenhumaConta {color: grey;}\n            .minha-classe {background-color: burlywood;}\n        </style>\n        <h1>{{ title }}</h1>\n        <h3 :class="{\'nenhumaConta\' : status === false, \'pago\' : status === 0, \'nao-pago\' : status > 0}">\n            {{status | statusGeneral}}\n        </h3>\n        <h3>{{total | currency \'R$ \'}}</h3>\n        <menu-component></menu-component> \n        <router-view></router-view>      \n    ',
    data: function data() {
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) {
                this.status = false;
            }
            var count = 0;
            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },

        /*metodo que faz a requisição da api*/
        updateStatus: function updateStatus() {
            var _this = this;

            //let self = this;
            Bill.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            //let self = this;
            Bill.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});