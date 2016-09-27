window.billReceiveCreateComponent = Vue.extend({
    template:`
            <form action="" name="form" v-on:submit.prevent="submit">
                <label>Vencimento:</label>
                <input type="text" v-model="bill.date_due"><br><br>
        
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" value="{{ o }}">{{ o }}</option>
                </select><br><br>
        
                <label>Valor:</label>
                <input type="text" v-model="bill.value"><br><br>
        
                <label>Recebido?</label>
                <input type="checkbox" v-model="bill.done"><br><br>
        
                <input type="submit" value="Enviar">
            </form>    
    `,
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Salário',
                'Investimento',
                'Poupança',
                'Extras'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    //função chamado logo apos criar o component
    created: function () {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
            var self = this;
            if(this.formType == 'insert'){
                Bill.save({},this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }else{
                Bill.update({id:this.bill.id},this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function (id) {
            var self = this;
            Bill.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});
