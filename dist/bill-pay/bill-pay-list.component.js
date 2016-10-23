'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n                <div class="container">\n                    <div class="row">\n                    <h2>Minha contas á pagar</h2>\n                        <table class="bordered striped highlight centered responsive-table z-depth-5">\n                            <thead>\n                            <tr>\n                                <th>#</th>\n                                <th>Vecimento</th>\n                                <th>Nome</th>\n                                <th>Valor</th>\n                                <th>Paga?</th>\n                                <th>Ações</th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr v-for="(index,o) in bills">\n                                <td>{{ index + 1 }}</td>\n                                <td>{{ o.date_due | dateFormat \'pt-BR\'}}</td>\n                                <td>{{ o.name | stringUpperCase}}</td>\n                                <td>{{ o.value | numberFormat \'pt-BR\'}}</td>\n                                <td class="white-text" :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">\n                                    {{ o.done | doneLabel }}\n                                </td>\n                                <td>\n                                    <a v-link="{ name: \'bill-pay.update\', params: {id: o.id} }">Editar</a> |\n                                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>                      \n                    </div>\n                </div>\n                <a class="btn waves-effect modal-trigger" href="#meu-modal">Abril Modal</a>\n                <button class="btn waves-effect modal-trigger" data-target="meu-modal">Abril Modal 2</button>\n                <div id="meu-modal" class="modal">\n                    <div class="modal-content">\n                        <h2>Meu primeiro modal</h2>\n                        <p>Texto do curso de laravel com vue.js</p>\n                    </div>\n                    <div class="modal-footer">\n                        <button class="btn btn-flat green modal-action modal-close">OK</button>\n                    </div>\n                </div>\n    ',
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
        $(document).ready(function () {
            $('.modal-trigger').leanModal();
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