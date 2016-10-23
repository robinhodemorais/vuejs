'use strict';

window.billReceiveListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },
    template: '\n                <div class="container">\n                    <div class="row">\n                    <h2>Minha contas á receber</h2>\n                        <table class="bordered striped highlight centered responsive-table">\n                            <thead>\n                            <tr>\n                                <th>#</th>\n                                <th>Vecimento</th>\n                                <th>Nome</th>\n                                <th>Valor</th>\n                                <th>Recebido?</th>\n                                <th>Ações</th>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr v-for="(index,o) in bills">\n                                <td>{{ index + 1 }}</td>\n                                <td>{{ o.date_due | dateFormat \'pt-BR\'}}</td>\n                                <td>{{ o.name | stringUpperCase}}</td>\n                                <td>{{ o.value | numberFormat \'pt-BR\'}}</td>\n                                <td class="white-text" :class="{\'green lighten-2\': o.done, \'red lighten-2\': !o.done}">\n                                    {{ o.done | doneLabelReceive }}\n                                </td>\n                                <td>\n                                    <a v-link="{ name: \'bill-receive.update\', params: {id: o.id} }">Editar</a> | \n                                    <a href="#" @click.prevent="openModalDelete(o)">Excluir</a> \n                                </td>\n                            </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>   \n                <modal :modal="modal">\n                    <div slot="content">\n                        <h4>Mensagem de confirmação</h4>\n                        <p><strong>Deseja excluir essa conta ?</strong></p>\n                        <div class="divider"></div>\n                        <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n                        <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong> </p>\n                        <p>Data de Vencimento: <strong>{{billToDelete.date_due | dateFormat }}</strong></p>\n                    </div>\n                    <div slot="footer">\n                        <button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close" \n                                @click="deleteBill()">OK</button>\n                        <button class="btn btn-flat waves-effect red lighten-2 modal-action modal-close">Cancelar</button>\n                    </div>\n                </modal>                                     \n    ',
    data: function data() {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
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

            // if(confirm('Deseja excluir esta conta?')){
            // let self = this;
            BillReceive.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluida com sucesso!', 4000);
                _this2.$dispatch('change-info');
            });
            // }
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').openModal();
        }
    }
});