"use strict";

window.billComponent = Vue.extend({
    template: "\n        <div class=\"navbar-fixed\">\n            <nav>\n                <div class=\"nav-wrapper container\">\n                            <a href=\"#\" class=\"right brand-logo\">Code Contas</a>\n                            <ul id=\"nav-mobile\" class=\"left\">\n                                <li v-for=\"o in menus\">\n                                    <a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n                                </li>\n                            </ul>\n                </div>\n            </nav>\n        </div>     \n        <div class=\"hide-on-small-only\">\n            teste jhdskahdaksh\n        </div>\n        <router-view></router-view>\n        ",
    data: function data() {
        return {
            menus: [{ name: "DashBoard", routeName: 'dashboard' }, { name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive.list' }]
        };
    }
});