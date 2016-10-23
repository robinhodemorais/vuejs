window.billPayListComponent = Vue.extend({
    template: `
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
                                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>                      
                    </div>
                </div>
                <a class="btn waves-effect modal-trigger" href="#meu-modal">Abril Modal</a>
                <button class="btn waves-effect modal-trigger" data-target="meu-modal">Abril Modal 2</button>
                <div id="meu-modal" class="modal">
                    <div class="modal-content">
                        <h2>Meu primeiro modal</h2>
                        <p>Texto do curso de laravel com vue.js</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-flat green modal-action modal-close">OK</button>
                    </div>
                </div>
    `,
    data() {
        return {
            bills: []
        };
    },
    created(){
        Bill.query().then((response) => {
            //quando usa o arrow functions pode utilizar o this que ira buscar
            //da classe pai, da classe que está a funcão
            this.bills = response.data;
        });
        $(document).ready(function () {
            $('.modal-trigger').leanModal();
        })
        //let self = this;
        /*Bill.query().then(function (response) {
            //quando não usa o arrow function, tem que utilizar a variavel
            //let self = this para pegar o this da classe pai, da classe que está a função
            self.bills = response.data;
        });*/
    },
    methods: {
        deleteBill(bill) {
            if(confirm('Deseja excluir esta conta?')){
                //let self = this;
                Bill.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});