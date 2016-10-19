'use strict';

var names = ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de crédito', 'Empréstimo', 'Gasolina'];

//let -> escopo e contexto local - variavel com ciclo de vida menor - em estrutura de repetição
//const -> quando é declarado o valor que vai ser apenas para leitura
//var -> escopo e contexto global

window.billPayCreateComponent = Vue.extend({
    template: '\n            <div class="container">\n                <div class="row">\n                    <form action="" name="form" @submit.prevent="submit">\n                        <div class="row">\n                            <label>Vencimento:</label>\n                            <input type="text" v-model="bill.date_due | dateFormat">\n                        </div>\n                        <div class="row">\n                            <label>Nome:</label>\n                            <select v-model="bill.name" id="name" class="browser-default">\n                                <option value="" disabled selected>Escolha um nome</option>\n                                <option v-for="o in names" value="{{ o }}">{{ o }}</option>\n                            </select>\n                         </div>   \n                        <div class="row">                    \n                            <label>Valor:</label>\n                            <input type="text" v-model="bill.value | numberFormat">\n                        </div>\n                        <div class="row">                            \n                            <input type="checkbox" class="filled-in" v-model="bill.done" id="pago">\n                            <label for="pago">Pago?</label>\n                        </div>\n                        <input type="submit" value="Enviar">\n                    </form>                 \n                </div>\n            </div>\n              \n    ',
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        };
    },

    //função chamado logo apos criar o component
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
        //para mostrar a lista no combo do materialize
        $(document).ready(function () {
            $('#name').material_select();
        });
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            //let self = this;
            if (this.formType == 'insert') {
                Bill.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            //let self = this;
            Bill.get({ id: id }).then(function (response) {
                _this2.bill = new BillPay(response.data);
            });
        },
        getDateDue: function getDateDue(date_due) {
            var dateDueObject = date_due;
            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }
    }
});