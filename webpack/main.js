//com amdjs
require(['./clients', './funcao'], function (colecao,minhaFuncao) {
    //em colecao pode ser qualquer nome
    console.log(colecao);

    console.log(minhaFuncao(10,20));

    //console.log(minhaVariavel);
    console.log(require('./variables'));
});



/*
//com commonjs
var colecao = require('./clients');
var minhaFuncao = require('./funcao');
var minhaVariavel = require('./variables');

console.log(colecao);
console.log(minhaFuncao(10,15));
console.log(minhaVariavel);
    */