
let clients = [
    {name: 'Cliente 1'},
    {name: 'Cliente 2'},
    {name: 'Cliente 3'},
    {name: 'Cliente 4'},
    {name: 'Cliente 5'},
];

/*
* default informa que vai exportar somente uma estrutura
* dessa forma podemos colocar qualquer nome na declaração
* do main
* export default {clients};
* */
export default {clients};

/*define('clients', [], function () {
    var clients = [
        {name: 'Cliente 1'},
        {name: 'Cliente 2'},
        {name: 'Cliente 3'},
        {name: 'Cliente 4'},
        {name: 'Cliente 5'},
    ];

    return clients;
});

*/

//em cammon.js
//module.exports = clients;