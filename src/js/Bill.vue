<template>
    <ul v-bind:id="o.id" class="dropdown-content my-custom-dropDown" v-for="o in menusDropdown">
        <li v-for="item in o.items" >
            <a v-link="{name: item.routeName}" class="my-custom-a">{{ item.name }}</a>
        </li>
    </ul>
    <div class="navbar-fixed">
        <!--<nav class="teal"> -->
        <nav>
            <div class="nav-wrapper container">
                <a href="#" class="right brand-logo">Code Contas</a>
                <a href="#" data-activates="nav-mobile" class="button-collapse">
                    <i class="material-icons">menu</i>
                </a>
                <ul class="left hide-on-med-and-down">
                    <li v-for="o in menus">
                        <a v-if="o.dropdownId" class="dropdown-button" href="!#"  v-bind:data-activates="o.dropdownId">
                            {{ o.name }} <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <a v-else v-link="{name: o.routeName}">
                            {{o.name}} <i class="material-icons left">pie_chart</i>
                        </a>
                    </li>
                </ul>
                <ul id="nav-mobile" class="side-nav">
                    <li v-for="o in menus">
                        <a v-link="{name: o.routeName}">{{o.name}}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <!-- <button class="btn">teste</button>
     <p class="my-custom-green">Robinho de Morais</p>
    <modal>
        <p slot="slot1">Code Education</p>
        <p slot="slot2">Robinho Education</p>
    </modal>-->
    <router-view></router-view>
</template>

<script type="text/javascript">
    export default {
        ready(){
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        },
        data() {
            return {
                menus: [
                    {name: "DashBoard", routeName: 'dashboard'},
                    {name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay'},
                    {name: "Contas a receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive'},
                ],
                menusDropdown: [
                    {
                        id: 'bill-pay', items: [
                        {id: 0, name: "Listar Contas", routeName: 'bill-pay.list'},
                        {id: 1, name: "Criar Conta", routeName: 'bill-pay.create'}
                    ]
                    },
                    {
                        id: 'bill-receive', items: [
                        {id: 0, name: "Listar Contas", routeName: 'bill-receive.list'},
                        {id: 1, name: "Criar Conta", routeName: 'bill-receive.create'}
                    ]
                    }
                ],
            };
        }
    };
</script>