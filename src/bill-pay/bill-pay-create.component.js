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
                                <input type="checkbox" class="filled-in" v-model="bill.done" id="pago">
                                <label for="pago">Pago?</label>
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
        //para mostrar a lista no combo do materialize
        $(document).ready(function () {
            $('#name').material_select();
        })
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
