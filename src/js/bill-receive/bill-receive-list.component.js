let modalComponent = require('../modal.component');

module.exports = {
    components:{
        'modal': modalComponent
    },
    template: `
                <div class="container">
                    <div class="row">
                    <h2>Minha contas á receber</h2>
                        <table class="bordered striped highlight centered responsive-table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Vecimento</th>
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Recebido?</th>
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
                                    {{ o.done | doneLabelReceive }}
                                </td>
                                <td>
                                    <a v-link="{ name: 'bill-receive.update', params: {id: o.id} }">Editar</a> | 
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
    `,
    data() {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created(){
        //let self = this;
        BillReceive.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill(bill) {
           // if(confirm('Deseja excluir esta conta?')){
               // let self = this;
                BillReceive.delete({id: this.billToDelete.id}).then((response) => {
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