'use strict';

window.billComponent = Vue.extend({
    template: '\n        <div class="navbar-fixed">\n            <nav>\n                <div class="nav-wrapper container">\n                            <a href="#" class="right brand-logo">Code Contas</a>\n                            <a href="#" data-activates="nav-mobile" \n                                class="button-collapse">\n                                <i class="material-icons">menu</i>\n                             </a>\n                            <ul class="left hide-on-med-and-down">\n                                <li v-for="o in menus">\n                                    <a v-link="{name: o.routeName}">{{ o.name }}</a>\n                                </li>\n                            </ul>\n                            <ul id="nav-mobile" class="side-nav">\n                                <li v-for="o in menus">\n                                    <a v-link="{name: o.routeName}">{{ o.name }}</a>\n                                </li>\n                            </ul>\n                </div>\n            </nav>\n        </div>     \n        <router-view></router-view>\n        ',
    created: function created() {
        //quando o dom estiver montado ai adiciona o sideNav no menu
        $(document).ready(function () {
            $('.button-collapse').sideNav();
        });
    },
    data: function data() {
        return {
            menus: [{ name: "DashBoard", routeName: 'dashboard' }, { name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive.list' }]
        };
    }
});