const names = [
    'Conta de luz',
    'Conta de água',
    'Conta de telefone',
    'Supermercado',
    'Cartão de crédito',
    'Empréstimo',
    'Gasolina'
];

//let -> escopo e contexto local - variavel com ciclo de vida menor - em estrutura de repetição
//const -> quando é declarado o valor que vai ser apenas para leitura
//var -> escopo e contexto global

window.billPayCreateComponent = Vue.extend({
    template:`
            <form action="" name="form" v-on:submit.prevent="submit">
                <label>Vencimento:</label>
                <input type="text" v-model="bill.date_due | dateFormat"><br><br>
        
                <label>Nome:</label>
                <select v-model="bill.name">
                    <option v-for="o in names" value="{{ o }}">{{ o }}</option>
                </select><br><br>
        
                <label>Valor:</label>
                <input type="text" v-model="bill.value | numberFormat"><br><br>
        
                <label>Pago?</label>
                <input type="checkbox" v-model="bill.done"><br><br>
        
                <input type="submit" value="Enviar">
            </form>    
    `,
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data() {
        return {
            formType: 'insert',
            names: names,
            bill: new BillPay()
        };
    },
    //função chamado logo apos criar o component
    created() {
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            var data = this.bill.toJSON();
            //let self = this;
            if(this.formType == 'insert'){
                Bill.save({},data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }else{
                Bill.update({id:this.bill.id},data).then((response) =>{
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id) {
            //let self = this;
            Bill.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        },
        getDateDue(date_due){
            let dateDueObject = date_due;
            if(!(date_due instanceof  Date)){
                dateDueObject = new Date(date_due.split('/').reverse().join('-')+"T03:00:00");
            }
            return dateDueObject.toISOString().split('T')[0];
        }

    }
});
