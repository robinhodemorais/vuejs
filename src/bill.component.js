window.billComponent = Vue.extend({
    template: `
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper container">
                            <a href="#" class="right brand-logo">Code Contas</a>
                            <ul id="nav-mobile" class="left">
                                <li v-for="o in menus">
                                    <a v-link="{name: o.routeName}">{{ o.name }}</a>
                                </li>
                            </ul>
                </div>
            </nav>
        </div>            
        <router-view></router-view>
        `,
    data() {
        return {
            menus: [
                {name: "DashBoard", routeName: 'dashboard'},
                {name: "Contas a pagar", routeName: 'bill-pay.list'},
                {name: "Contas a receber", routeName: 'bill-receive.list'},
            ],
        };
    }
});