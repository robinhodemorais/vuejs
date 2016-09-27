window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: `
        <style type="text/css">
            .red {color: red;}
            .green {color: green;}
            .gray {color: gray;}
            .existeConta {color: red;}
            .nenhumaConta {color: grey;}
            .minha-classe {background-color: burlywood;}
        </style>
        <h1>{{ title }}</h1>
        <h3 :class="{'nenhumaConta' : status === false, 'pago' : status === 0, 'nao-pago' : status > 0}">
            {{status | statusGeneral}}
        </h3>
        <h3>{{total | currency 'R$ '}}</h3>
        <menu-component></menu-component> 
        <router-view></router-view>      
    `,
    data: function(){
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created: function () {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus: function (bills) {
            if(!bills.length){
                this.status = false;
            }
            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        /*metodo que faz a requisição da api*/
        updateStatus: function () {
            var self = this;
            Bill.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function () {
            var self = this;
            Bill.total().then(function (response) {
                self.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function () {
            this.updateStatus();
            this.updateTotal();
        }
    }
});
