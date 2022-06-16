var funcDiscount = require("./modules/calDiscont");

console.log("olá Senac");

var client = 'Senac Campinas';

console.log(`Cliente: ${client}`);

var valProduct = 100;
var valDiscount = 37;

var finalValue= funcDiscount(valProduct, valDiscount);

console.log(`Valor do Pruduto com Descont: R$ ${finalValue},00`);