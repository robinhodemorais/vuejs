'use strict';

window.billComponent = Vue.extend({
    components: {
        'modal': window.modalComponent
    },
    template: '\n        <ul v-bind:id="o.id" class="dropdown-content my-custom-dropDown" v-for="o in menusDropdown">\n            <li v-for="item in o.items" >\n                <a v-link="{name: item.routeName}" class="my-custom-a">{{ item.name }}</a>\n            </li>\n        </ul>\n        <div class="navbar-fixed">\n            <!--<nav class="teal"> -->\n            <nav>\n                <div class="nav-wrapper container">\n                    <a href="#" class="right brand-logo">Code Contas</a>\n                    <a href="#" data-activates="nav-mobile" class="button-collapse">\n                       <i class="material-icons">menu</i>\n                    </a>\n                    <ul class="left hide-on-med-and-down">\n                        <li v-for="o in menus">\n                           <a v-if="o.dropdownId" class="dropdown-button" href="!#"  v-bind:data-activates="o.dropdownId">\n                             {{ o.name }} <i class="material-icons right">arrow_drop_down</i>\n                           </a>\n                            <a v-else v-link="{name: o.routeName}">\n                             {{o.name}} <i class="material-icons left">pie_chart</i>\n                            </a>\n                        </li>\n                     </ul>\n                     <ul id="nav-mobile" class="side-nav">\n                         <li v-for="o in menus">\n                            <a v-link="{name: o.routeName}">{{o.name}}</a>\n                         </li>\n                      </ul>                           \n                </div>\n            </nav>\n        </div>    \n        <!-- <button class="btn">teste</button>\n         <p class="my-custom-green">Robinho de Morais</p> \n        <modal>\n            <p slot="slot1">Code Education</p>\n            <p slot="slot2">Robinho Education</p>\n        </modal>-->\n        <router-view></router-view>\n        ',
    created: function created() {
        //quando o dom estiver montado ai adiciona o sideNav no menu
        $(document).ready(function () {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "DashBoard", routeName: 'dashboard' }, { name: "Contas a pagar", routeName: 'bill-pay.list', dropdownId: 'bill-pay' }, { name: "Contas a receber", routeName: 'bill-receive.list', dropdownId: 'bill-receive' }],
            menusDropdown: [{
                id: 'bill-pay', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
            }, {
                id: 'bill-receive', items: [{ id: 0, name: "Listar Contas", routeName: 'bill-receive.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-receive.create' }]
            }]
        };
    }
});