window.billReceiveListComponent = Vue.extend({
    template: `
            <style type="text/css">
                .recebido {color: green;}
                .nao-recebido {color: red;}
            </style>
            <table border="1" cellpadding="10">
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
                    <td>{{ o.date_due}}</td>
                    <td>{{ o.name }}</td>
                    <td>{{ o.value | currency 'R$ ' 2 | real}}</td>
                    <td class="minha-classe" :class="{'recebido': o.done, 'nao-recebido': !o.done}">
                        {{ o.done | doneLabelReceive }}
                    </td>
                    <td>
                        <a v-link="{ name: 'bill-receive.update', params: {id: o.id} }">Editar</a> | 
                        <a href="#" @click.prevent="deleteBill(o)">Excluir</a> 
                    </td>
                </tr>
                </tbody>
            </table>
    `,
    data: function () {
        return {
            //bills: this.$root.$children[0].billsPay
            bills: []
        };
    },
    created: function (){
        var self = this;
        BillReceive.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill: function (bill) {
            if(confirm('Deseja excluir esta conta?')){
                var self = this;
                Bill.delete({id: bill.id}).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});