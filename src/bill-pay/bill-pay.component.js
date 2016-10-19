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
                    <div class="col s5 offset-s7 z-depth-1 blue">
                        <h3>{{total | currency 'R$ '}}</h3><i class="material-icons large red-text text-darken-2">add_box</i>
                    </div>
                    <button class="btn-flat blue waves-effect waves-darken purple-text">
                        <i class="material-icons left">add_circle</i> Meu Botão
                    </button>
                    <a class="btn">
                        <i class="material-icons right">add_circle</i>Minha Ancora
                    </a>
                    <button class="btn-floating btn-large">
                        <i class="material-icons left">add</i>
                    </button>
                </div>
                <div class="row">
                    <div class="col s4">
                        <div class="card green darken-3">
                            <div class="card-content white-text">
                                <p class="card-title">Meu titulo</p>
                                <p>Robinho de Morais</p>
                            </div>
                            <div class="card-action">
                                <a href="#">Minha Ancora</a>
                            </div>
                        </div>
                    </div>
                    <div class="col s4">
                        <div class="card-panel red darken-2">
                            <p class="white-text">Robinho de Morais</p>
                        </div>
                    </div>
                    <div class="col s4">
                        <div class="card">
                            <div class="card-image">
                                <img src="http://horoscopovirtual.uol.com.br/imagem/artigos/artigos/oceano.jpg" alt="">
                                <p class="card-title">Meu titulo</p>
                            </div>
                            <div class="card-content">
                                <p class="card-title">Meu titulo</p>
                                <p>Robinho de Morais</p>
                            </div>
                            <div class="card-action">
                                <a href="#">Minha Ancora</a>
                            </div>
                        </div>
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
