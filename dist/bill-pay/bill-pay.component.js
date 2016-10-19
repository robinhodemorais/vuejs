'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n        <style type="text/css">\n            .red {color: red;}\n            .green {color: green;}\n            .gray {color: gray;}\n            .existeConta {color: red;}\n            .nenhumaConta {color: grey;}\n            .minha-classe {background-color: burlywood;}\n        </style>\n        <div class="section">\n            <div class="container">\n                <h1>{{ title }}</h1>\n                <h3 :class="{\'nenhumaConta\' : status === false, \'pago\' : status === 0, \'nao-pago\' : status > 0}">\n                    {{status | statusGeneral}}\n                </h3>\n                <div class="row">\n                    <div class="col s5 offset-s7 z-depth-1 blue">\n                        <h3>{{total | currency \'R$ \'}}</h3><i class="material-icons large red-text text-darken-2">add_box</i>\n                    </div>\n                    <button class="btn-flat blue waves-effect waves-darken purple-text">\n                        <i class="material-icons left">add_circle</i> Meu Botão\n                    </button>\n                    <a class="btn">\n                        <i class="material-icons right">add_circle</i>Minha Ancora\n                    </a>\n                    <button class="btn-floating btn-large">\n                        <i class="material-icons left">add</i>\n                    </button>\n                </div>\n                <div class="row">\n                    <div class="col s4">\n                        <div class="card green darken-3">\n                            <div class="card-content white-text">\n                                <p class="card-title">Meu titulo</p>\n                                <p>Robinho de Morais</p>\n                            </div>\n                            <div class="card-action">\n                                <a href="#">Minha Ancora</a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="col s4">\n                        <div class="card-panel red darken-2">\n                            <p class="white-text">Robinho de Morais</p>\n                        </div>\n                    </div>\n                    <div class="col s4">\n                        <div class="card">\n                            <div class="card-image">\n                                <img src="http://horoscopovirtual.uol.com.br/imagem/artigos/artigos/oceano.jpg" alt="">\n                                <p class="card-title">Meu titulo</p>\n                            </div>\n                            <div class="card-content">\n                                <p class="card-title">Meu titulo</p>\n                                <p>Robinho de Morais</p>\n                            </div>\n                            <div class="card-action">\n                                <a href="#">Minha Ancora</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>    \n        <router-view></router-view>      \n    ',
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