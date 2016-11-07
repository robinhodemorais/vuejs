<template>
    <div class="section">
        <div class="container">
            <h4>{{ title }}</h4>
            <div class="row">
                <div class="col s6">
                    <div class="card z-depth-2 red" >
                        <div class="card-content white-text">
                            <p class="card-title">
                            <p><i class="material-icons">account_balance</i><strong> CONTAS Á PAGAR</strong></p>
                            </p>
                            <h5>{{totalPay | currency 'R$ '}}</h5>
                        </div>
                    </div>
                </div>
                <div class="col s6">
                    <div class="card z-depth-2 green" >
                        <div class="card-content white-text">
                            <p class="card-title">
                            <p><i class="material-icons">payment</i><strong> CONTAS Á RECEBER</strong></p>
                            </p>
                            <h5>{{totalReceive | currency 'R$ '}}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <router-view></router-view>
</template>
<script type="text/javascript">
    import {BillResource} from '../resources';
    import {BillResourceReceive} from '../resources';

    export default {
        data: function(){
            return {
                title: "DashBoard",
                totalPay: 0,
                totalReceive: 0
            };
        },
        created: function () {
            this.updateTotalPay();
            this.updateTotalReceive();
        },
        methods: {
            updateTotalPay: function () {
                let self = this;
                BillResource.total().then(function (response) {
                    self.totalPay = response.data.total;
                });
            },
            updateTotalReceive: function () {
                let self = this;
                BillResourceReceive.total().then(function (response) {
                    self.totalReceive = response.data.total;
                });
            }
        },
        events: {
            'change-info': function () {
                this.updateTotalPay();
                this.updateTotalReceive();
            }
        }
    };

</script>
