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
        <div class="section">
            <div class="container">
                <h1>{{ title }}</h1>
                <h3 :class="{'nenhumaConta' : status === false, 'pago' : status === 0, 'nao-pago' : status > 0}">
                    {{status | statusGeneral}}
                </h3>
                <div class="row">
                    <div class="col s5 offset-s7 z-depth-1">
                        <h3>{{total | currency 'R$ '}}</h3>
                    </div>
                </div>
            </div>
        </div>    
        <router-view></router-view>      
    `,
    data(){
        return {
            title: "Contas a pagar",
            status: false,
            total: 0
        };
    },
    created () {
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
            Bill.query().then((response) => {
                this.calculateStatus(response.data);
            });
        },
        updateTotal() {
            //let self = this;
            Bill.total().then((response) =>  {
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
