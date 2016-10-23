"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 0 ? "Não Paga" : "Paga";
});
/*Vue.filter('doneLabel', function (value) {
    if(value == 0 ){
        return "Não paga";
    }else{
        return "Paga";
    }
});
*/
Vue.filter('statusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }
    if (!value) {
        return 'Nenhuma conta a pagar';
    } else {
        return value + ' contas á pagar';
    }
});
/*
Vue.filter('statusGeneral', function(value){
    if(value === false){
        return 'Nenhuma conta cadastrada';
    }

    if(!value){
        return 'Nenhuma conta a pagar';
    } else {
        return 'Existem ' + value + ' contas a serem pagas';
    }
});
*/
Vue.filter('doneLabelReceive', function (value) {
    return value == 0 ? "Não Recebida" : "Recebida";
});
/*
Vue.filter('doneLabelReceive', function (value) {
    if(value == 0 ){
        return "Não Recebida";
    }else{
        return "Recebida";
    }
});
*/
Vue.filter('statusGeneralReceive', function (value) {
    if (value === false) {
        return 'Nenhuma recebimento cadastrado';
    }
    if (!value) {
        return 'Nenhuma contas a receber';
    } else {
        return value + ' contas á receber';
    }
});

/*
Vue.filter('statusGeneralReceive', function(value){
    if(value === false){
        return 'Nenhuma recebimento cadastrado';
    }

    if(!value){
        return 'Nenhuma contas a receber';
    } else {
        return 'Existem ' + value + ' contas a serem recebidas';
    }
});
*/
Vue.filter('numberFormat', {
    read: function read(value, linguagem) {
        //mostra a informação na view
        var number = 0;
        //se não for nulo ou undefined
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : null;
        }
        /*
        var numberFormat = new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
        */
        //return new Intl.NumberFormat('pt-BR', {
        return new Intl.NumberFormat(linguagem, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        //pega o valor da view e converte para armazenar no modelo
        var number = 0;
        if (value.length > 0) {
            //remove o R$ e depois troca a virgula por ponto para poder gravar
            //1 > R$ 75,00 - 2 > 75,00 - 3 > 75.00
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value, linguagem) {
        //mostra a informação na view
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                //verifica se não é Data yyyy-mm-dd
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;
                if (dateString) {
                    //verifica se o valor é valido
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }
            //data formatada com ES6
            //return new Intl.DateTimeFormat('pt-BR').format(value).split(' ')[0];
            return new Intl.DateTimeFormat(linguagem).format(value).split(' ')[0];
        }
        return value;
    },
    write: function write(value) {
        //pega o valor da view e converte para armazenar no modelo
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);
        if (dateRegex) {
            var dateString = dateRegex[0];
            //converte 10/10/2016 para 2016-10-10
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return value;
    }
});

Vue.filter('stringUpperCase', {
    read: function read(value) {
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) !== undefined) {
            return value.toUpperCase();
        }
        return value;
    }
});