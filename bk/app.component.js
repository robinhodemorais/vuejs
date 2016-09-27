window.appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
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
        <menu-component></menu-component> 
        <router-view></router-view>
       <!-- <div v-show="activedView == 0">
           <bill-list-component v-ref:bill-list-component></bill-list-component>
        </div>
        
        <div v-show="activedView == 1">
           <bill-create-component :bill.sync="bill"></bill-create-component>
           <!-- 
           A propriedade bill do create component é igual ao bill do appComponent
           .sync faz a sincronização com se fosse um two way data bind
           analisa se necessita usar o sync, pois se for mandar o dado somente 1
           vez não tem necessidade de usar o sync
           
        </div> -->
    `,
    data: function(){
        return {
            title: "Contas a pagar",
            activedView : 0
        };
    },
    computed: {
        status: function () {
            var billListComponent = this.$refs.billListComponent;
            if(!billListComponent.bills.length){
                return false;
            }
            var count = 0;
            for(var i in billListComponent.bills){
                if(!billListComponent.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods: {},
    events: {
        'change-activedview': function (activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function (formType) {
            //dispara de pai para filho
            this.$broadcast('change-formtype',formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        }
    }
});
