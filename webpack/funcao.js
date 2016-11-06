//ES6 modules
export function soma(num1, num2) {
    return num1+num2;
}

export class Teste {
    mostrar(){
        console.log('Hello World');
    }
}

//modulo com amd
/*define('funcao',[], function () {
    function soma(num1, num2) {
        return num1+num2;
    }

    return soma;

});
*/
//module.exports = soma;