/*app.$watch('test', function (novoValor, anterior) {
 console.log("velhoValor: " + anterior + ", novoValor: " + novoValor)
 });*/

Vue.filter('doneLabel', function (value) {
    if(value == 0 ){
        return "Não paga";
    }else{
        return "Paga";
    }
});

Vue.filter('statusGeneral', function(value){
    if(value === false){
        return 'Nenhuma conta cadastrada';
    }

    if(!value){
        return 'Nenhuma conta a pagar';
    } else {
        return 'Existem ' + value + ' contas a serem pagas';
    }
});

Vue.filter('real', function (value) {
    return value.replace(',','@').replace('.',',').replace('@','.');
});
var menuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
                </li>
            </ul>
        </nav>`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
        };
    },
    methods: {
        showView: function (id) {
            this.$dispatch('change-bill', id);
            //dispara o evento de pai para filho na transação id
            this.$dispatch('change-activedview',id);
            //usa o $parent para conseguir acessar o component pai
            //com o evento de cima, podemos desabilitar isso
            //this.$parent.activedView = id;
            if(id == 1){
                //this.$parent.formType = 'insert';
                this.$dispatch('change-formtype','insert');
            }
        }
    }

});

var billListComponent = Vue.extend({
    template: `
            <style type="text/css">
                .pago {color: green;}
                .nao-pago {color: red;}
            </style>
            <table border="1" cellpadding="10">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vecimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Paga?</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(index,o) in bills">
                    <td>{{ index + 1 }}</td>
                    <td>{{ o.date_due}}</td>
                    <td>{{ o.name }}</td>
                    <td>{{ o.value | currency 'R$ ' 2 | real}}</td>
                    <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
                        {{ o.done | doneLabel }}
                    </td>
                    <td>
                        <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                        <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                    </td>
                </tr>
                </tbody>
            </table>
    `,
    data: function () {
        return {
            bills: [
                {date_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {date_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {date_due: '22/08/2016', name: 'Conta de telefone', value: 55.99, done: false},
                {date_due: '23/08/2016', name: 'Supermercado', value: 625.99, done: false},
                {date_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
                {date_due: '25/08/2016', name: 'Empréstimo', value: 2000.99, done: false},
                {date_due: '26/08/2016', name: 'Gasolina', value: 200, done: false}
                ]
        };
    },
    methods: {
        loadBill: function (bill) {
           // this.$parent.bill = bill;
            //this.$parent.activedView = 1;
            //dispara o evento de pai para filho na transação id 1
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview',1);
            this.$dispatch('change-formtype','update');
            //this.$parent.formType = 'update';
        },
        deleteBill: function (bill) {
            if(confirm('Deseja excluir esta conta?')){
                this.bills.$remove(bill);
            }
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});

var billCreateComponent = Vue.extend({
    template:`
            <form action="" name="form" v-on:submit.prevent="submit">
                <label>Vencimento:</label>
                <input type="text" v-model="bill.date_due"><br><br>
        
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" value="{{ o }}">{{ o }}</option>
                </select><br><br>
        
                <label>Valor:</label>
                <input type="text" v-model="bill.value"><br><br>
        
                <label>Pago?</label>
                <input type="checkbox" v-model="bill.done"><br><br>
        
                <input type="submit" value="Enviar">
            </form>    
    `,
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    methods: {
        submit: function () {
            if(this.formType == 'insert'){
                //this.$parent.$refs.billListComponent.bills.push(this.bill);
                this.$dispatch('new-bill', this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$dispatch('change-activedview',0);
           // this.$parent.activedView = 0;
        }
    },
    events: {
        'change-formtype':function (formType) {
            this.formType = formType;
        },
        'change-bill': function (bill) {
            this.bill = bill;
        },
    }
});

var appComponent = Vue.extend({
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
        <div v-show="activedView == 0">
           <bill-list-component v-ref:bill-list-component></bill-list-component>
        </div>
        
        <div v-show="activedView == 1">
           <bill-create-component :bill.sync="bill"></bill-create-component>
           <!-- 
           A propriedade bill do create component é igual ao bill do appComponent
           .sync faz a sincronização com se fosse um two way data bind
           analisa se necessita usar o sync, pois se for mandar o dado somente 1
           vez não tem necessidade de usar o sync
           -->
        </div>
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
//registra o componente
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",
});