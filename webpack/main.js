//com amdjs
require(['./clients', './funcao', './variables'], function (colecao,minhaFuncao,minhaVariavel) {
    //em colecao pode ser qualquer nome
    console.log(colecao);

    console.log(minhaFuncao(10,20));

    console.log(minhaVariavel);
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