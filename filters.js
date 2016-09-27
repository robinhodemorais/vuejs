Vue.filter('doneLabel', function (value) {
    if(value == 0 ){
        return "Não paga";
    }else{
        return "Paga";
    }
});

Vue.filter('doneLabelReceive', function (value) {
    if(value == 0 ){
        return "Não Recebida";
    }else{
        return "Recebida";
    }
});

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


Vue.filter('real', function (value) {
    return value.replace(',','@').replace('.',',').replace('@','.');
});