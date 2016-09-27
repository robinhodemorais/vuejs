window.menuComponent = Vue.extend({
    template: `
        <nav>
            <ul>
                <li v-for="o in menus">
                    <a href="#" @click.prevent="showView(o.id)">{{ o.name }}</a>
                </li>
            </ul>
        </nav>`,
    data: function () {
        return {
            menus: [
                {id: 0, name: "Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
        };
    },
    methods: {
        showView: function (id) {
            this.$dispatch('change-bill', id);
            //dispara o evento de pai para filho na transação id
            this.$dispatch('change-activedview',id);
            //usa o $parent para conseguir acessar o component pai
            //com o evento de cima, podemos desabilitar isso
            //this.$parent.activedView = id;
            if(id == 1){
                //this.$parent.formType = 'insert';
                this.$dispatch('change-formtype','insert');
            }
        }
    }

});