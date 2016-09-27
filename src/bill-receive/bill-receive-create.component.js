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
                <input type="text" v-model="bill.value | numberFormat"><br><br>
        
                <label>Recebido?</label>
                <input type="checkbox" v-model="bill.done"><br><br>
        
                <input type="submit" value="Enviar">
            </form>    
    `,
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data() {
        return {
            formType: 'insert',
            names: [
                'Salário',
                'Investimentos',
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
    created() {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            var data = Vue.util.extend(this.bill, {date_due:this.getDateDue(this.bill.date_due)});
            //var data = this.bill.toJSON();
            //let self = this;
            if(this.formType == 'insert'){
                BillReceive.save({},data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id:this.bill.id},data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id) {
           // let self = this;
            BillReceive.get({id: id}).then((response) => {
                this.bill = response.data;
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
