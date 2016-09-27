'use strict';

window.billReceiveCreateComponent = Vue.extend({
    template: '\n            <form action="" name="form" v-on:submit.prevent="submit">\n                <label>Vencimento:</label>\n                <input type="text" v-model="bill.date_due"><br><br>\n        \n                <label>Nome:</label>\n                <select v-model="bill.name">\n                    <option v-for="o in names" value="{{ o }}">{{ o }}</option>\n                </select><br><br>\n        \n                <label>Valor:</label>\n                <input type="text" v-model="bill.value | numberFormat"><br><br>\n        \n                <label>Recebido?</label>\n                <input type="checkbox" v-model="bill.done"><br><br>\n        \n                <input type="submit" value="Enviar">\n            </form>    \n    ',
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data: function data() {
        return {
            formType: 'insert',
            names: ['Salário', 'Investimentos', 'Poupança', 'Extras'],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },

    //função chamado logo apos criar o component
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = Vue.util.extend(this.bill, { date_due: this.getDateDue(this.bill.date_due) });
            //var data = this.bill.toJSON();
            //let self = this;
            if (this.formType == 'insert') {
                BillReceive.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            // let self = this;
            BillReceive.get({ id: id }).then(function (response) {
                _this2.bill = response.data;
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