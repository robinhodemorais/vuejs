'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n            <style type="text/css">\n                .pago {color: green;}\n                .nao-pago {color: red;}\n            </style>\n            <div class="container">\n                <div class="row">\n                    <div class="col s12">\n                        <table border="1" cellpadding="10">\n                            <thead>\n                            <tr>\n                                <th>#</th>\n                                <th>Vecimento</th>\n                                <th>Nome</th>\n                                <th>Valor</th>\n                                <th>Paga?</th>\n                                <th>Ações</th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr v-for="(index,o) in bills">\n                                <td>{{ index + 1 }}</td>\n                                <td>{{ o.date_due | dateFormat \'pt-BR\'}}</td>\n                                <td>{{ o.name | stringUpperCase}}</td>\n                                <td>{{ o.value | numberFormat \'pt-BR\'}}</td>\n                                <td class="minha-classe" :class="{\'pago\': o.done, \'nao-pago\': !o.done}">\n                                    {{ o.done | doneLabel }}\n                                </td>\n                                <td>\n                                    <a v-link="{ name: \'bill-pay.update\', params: {id: o.id} }">Editar</a> |\n                                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>                      \n                    </div>\n                    <!--<div class="col s2">\n                        texto\n                    </div>-->\n                </div>\n            </div>\n    ',
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            //quando usa o arrow functions pode utilizar o this que ira buscar
            //da classe pai, da classe que está a funcão
            _this.bills = response.data;
        });
        //let self = this;
        /*Bill.query().then(function (response) {
            //quando não usa o arrow function, tem que utilizar a variavel
            //let self = this para pegar o this da classe pai, da classe que está a função
            self.bills = response.data;
        });*/
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm('Deseja excluir esta conta?')) {
                //let self = this;
                Bill.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});