import colecao from './clients';
import * as bloco from './funcao';
import {teste as variavel} from './variables';

let object = new bloco.Teste();

console.log(colecao);
console.log(bloco.soma(10,5));
console.log(variavel);
object.mostrar();

//com amdjs
/*require(['./clients', './funcao'], function (colecao,minhaFuncao) {
    //em colecao pode ser qualquer nome
    console.log(colecao);

    console.log(minhaFuncao(10,20));

    //console.log(minhaVariavel);
    console.log(require('./variables'));
});
*/


/*
//com commonjs
var colecao = require('./clients');
var minhaFuncao = require('./funcao');
var minhaVariavel = require('./variables');

console.log(colecao);
console.log(minhaFuncao(10,15));
console.log(minhaVariavel);
    */