window.billReceiveListComponent = Vue.extend({
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
                                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a> 
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>                        
    `,
    data() {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: []
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
            if(confirm('Deseja excluir esta conta?')){
               // let self = this;
                BillReceive.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});