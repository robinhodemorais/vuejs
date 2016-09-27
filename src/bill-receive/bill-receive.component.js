window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
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
        <h3 :class="{'nenhumaConta' : status === false, 'recebido' : status === 0, 'nao-recebido' : status > 0}">
            {{status | statusGeneralReceive}}
        </h3>
         <h3>{{total | currency 'R$ '}}</h3>
        <menu-component></menu-component> 
        <router-view></router-view>      
    `,
    data(){
        return {
            title: "Contas a receber",
            status: false,
            total: 0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills) {
            if(!bills.length){
                this.status = false;
            }
            let count = 0;
            for(let i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        /*metodo que faz a requisição da api*/
        updateStatus() {
            //let self = this;
            BillReceive.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal() {
            //let self = this;
            BillReceive.total().then((response) => {
                this.total = response.data.total;
            });
        }
    },
    events: {
        'change-info'() {
            this.updateStatus();
            this.updateTotal();
        }
    }
});

