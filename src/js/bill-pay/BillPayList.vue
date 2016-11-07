<template>
    <div class="container">
        <div class="row">
            <h2>Minha contas á pagar</h2>
            <table class="bordered striped highlight centered responsive-table z-depth-5">
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
                    <td>{{ o.date_due | dateFormat 'pt-BR'}}</td>
                    <td>{{ o.name | stringUpperCase}}</td>
                    <td>{{ o.value | numberFormat 'pt-BR'}}</td>
                    <td class="white-text" :class="{'green lighten-2': o.done, 'red lighten-2': !o.done}">
                        {{ o.done | doneLabel }}
                    </td>
                    <td>
                        <a v-link="{ name: 'bill-pay.update', params: {id: o.id} }">Editar</a> |
                        <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <modal :modal="modal">
        <div slot="content" v-if="billToDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir essa conta ?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{billToDelete.name}}</strong></p>
            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong> </p>
            <p>Data de Vencimento: <strong>{{billToDelete.date_due | dateFormat }}</strong></p>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-action modal-close"
                    @click="deleteBill()">OK</button>
            <button class="btn btn-flat waves-effect red lighten-2 modal-action modal-close">Cancelar</button>
        </div>
    </modal>
</template>
<script type="text/javascript">
    import {BillResource} from '../resources';
    import ModalComponent from '../Modal.vue';
    //let modalComponent = require('../modal.component');

    export default {
        components:{
            'modal': ModalComponent
        },
        data() {
            return {
                bills: [],
                billToDelete: null,
                modal: {
                    id: 'modal-delete'
                }
            };
        },
        created(){
            BillResource.query().then((response) => {
                //quando usa o arrow functions pode utilizar o this que ira buscar
                //da classe pai, da classe que está a funcão
                this.bills = response.data;
            });
        },
        methods: {
            deleteBill() {
                // if(confirm('Deseja excluir esta conta?')){
                BillResource.delete({id: this.billToDelete.id}).then((response) => {
                    this.bills.$remove(this.billToDelete);
                    this.billToDelete = null;
                    Materialize.toast('Conta excluida com sucesso!', 4000);
                    this.$dispatch('change-info');
                });
                // }
            },
            openModalDelete(bill){
                this.billToDelete = bill;
                $('#modal-delete').openModal();
            }
        }
    };
</script>
