'use strict';

window.billReceiveListComponent = Vue.extend({
    template: '\n            <style type="text/css">\n                .recebido {color: green;}\n                .nao-recebido {color: red;}\n            </style>\n            <table border="1" cellpadding="10">\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Vecimento</th>\n                    <th>Nome</th>\n                    <th>Valor</th>\n                    <th>Recebido?</th>\n                    <th>Ações</th>\n                </tr>\n                </thead>\n                <tbody>\n                <tr v-for="(index,o) in bills">\n                    <td>{{ index + 1 }}</td>\n                    <td>{{ o.date_due | dateFormat \'pt-BR\'}}</td>\n                    <td>{{ o.name | stringUpperCase}}</td>\n                    <td>{{ o.value | numberFormat \'pt-BR\'}}</td>\n                    <td class="minha-classe" :class="{\'recebido\': o.done, \'nao-recebido\': !o.done}">\n                        {{ o.done | doneLabelReceive }}\n                    </td>\n                    <td>\n                        <a v-link="{ name: \'bill-receive.update\', params: {id: o.id} }">Editar</a> | \n                        <a href="#" @click.prevent="deleteBill(o)">Excluir</a> \n                    </td>\n                </tr>\n                </tbody>\n            </table>\n    ',
    data: function data() {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        //let self = this;
        BillReceive.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm('Deseja excluir esta conta?')) {
                // let self = this;
                BillReceive.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});