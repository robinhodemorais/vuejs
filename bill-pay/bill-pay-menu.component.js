window.billPayMenuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a v-link="{name: o.routeName}">{{ o.name }}</a>
                </li>
            </ul>
        </nav>`,
    data: function () {
        return {
            menus: [
                // {id: 0, name: "Listar Contas", url: '/bills'},
                // {id: 1, name: "Criar Conta", url: '/bill/create'}
                {id: 0, name: "Listar Contas", routeName: 'bill-pay.list'},
                {id: 1, name: "Criar Conta", routeName: 'bill-pay.create'}
            ],
        };
    }/*,
    methods: {
        showView: function (id) {
            //this.$dispatch('change-bill', id);
            //dispara o evento de pai para filho na transação id
            //this.$dispatch('change-activedview',id);
            //usa o $parent para conseguir acessar o component pai
            //com o evento de cima, podemos desabilitar isso
            //this.$parent.activedView = id;
            if(id == 1){
                //this.$parent.formType = 'insert';
                this.$dispatch('change-formtype','insert');
            }
        }
    }*/

});