const namesReceive = [
    'Salário',
    'Investimentos',
    'Poupança',
    'Extras'
    ]
;

window.billReceiveCreateComponent = Vue.extend({
    template:`
            <div class="container">
                <div class="row">
                <h2>Nova conta</h2>
                <form action="" name="form" @submit.prevent="submit">
                <div class="row">
                   <div class="input-field col s6">
                     <label class="active">Vencimento:</label>
                     <input type="text" v-model="bill.date_due | dateFormat"
                     placeholder="Informe a data">
                   </div>
                        <div class="input-field col s6">
                          <label class="active">Valor:</label>
                            <input type="text" v-model="bill.value | numberFormat">
                        </div>         
                </div>
                                
                <div class="row">
                   <div class="input-field col s6">
                            <label class="active">Nome:</label>
                            <select v-model="bill.name" id="name" class="browser-default">
                                <option value="" disabled selected>Escolha um nome</option>
                                <option v-for="o in names" value="{{ o }}">{{ o }}</option>
                            </select>
                   </div>
                       <div class="input-field col s6">
                            <input type="checkbox" class="filled-in" v-model="bill.done" id="recebido">
                            <label for="recebido">Recebido?</label>
                        </div>         
                </div>
          
                        <div class="row">
                            <div class="input-field col s12">
                                <input type="submit" value="Enviar" class="btn btn-large right">
                            </div>
                        </div>                        
                    
                    </form>   
                </div>
            </div>             
    `,
    //permite que um dado do escopo seja acessivel ao componente declarado no html
    //props:['bill'],
    data() {
        return {
            formType: 'insert',
            names: namesReceive,
            bill: new BillRec()
        };
    },
    //função chamado logo apos criar o component
    created() {
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
        //para mostrar a lista no combo do materialize
        $(document).ready(function () {
            $('#name').material_select();
        })
    },
    methods: {
        submit() {
            var data = this.bill.toJSON();
            //var data = Vue.util.extend(this.bill, {date_due:this.getDateDue(this.bill.date_due)});
            //let self = this;
            if(this.formType == 'insert'){
                BillReceive.save({},data).then((response) => {
                    Materialize.toast('Conta criada com sucesso!', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id:this.bill.id},data).then((response) => {
                    Materialize.toast('Conta criada com sucesso!', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id) {
           // let self = this;
            BillReceive.get({id: id}).then((response) => {
                //this.bill = response.data;
                this.bill = new BillRec(response.data)
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
