window.billPayListComponent = Vue.extend({
    template: `
            <style type="text/css">
                .pago {color: green;}
                .nao-pago {color: red;}
            </style>
            <div class="container">
                <div class="row">
                    <div class="col s12">
                        <table border="1" cellpadding="10">
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
                                <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
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
                    <!--<div class="col s2">
                        texto
                    </div>-->
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