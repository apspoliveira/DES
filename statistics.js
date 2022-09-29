const write_file = require("./write_file.js");

var jogos_jogados = 0;
var jogos_ganhos = 0;
var percentagem_ganhos = 0;
var melhor_tentativa = 0;
var sequencia_atual = 0;
var melhor_sequencia = 0;
var distribuicao = [0, 0, 0, 0, 0, 0];

function output(word) {
    this.percentagem_ganhos =  Math.floor(this.jogos_ganhos/this.jogos_jogados*100);
    console.log(`Games: ${this.jogos_jogados}   Won: ${this.jogos_ganhos}    % Won:   ${this.percentagem_ganhos} %\n`);
    console.log(`Best try: #${this.melhor_tentativa}   Actual: ${this.sequencia_atual}   Best: ${this.melhor_sequencia}\n`);

    var total = calculateSum(this.distribuicao);
    console.log("Distribuição de melhores tentativas");
    console.log(`#1 ${total > 0 ? Math.floor(this.distribuicao[0]/total*100) : 0}% ${this.distribuicao[0]}`);
    console.log(`#2 ${total > 0 ? Math.floor(this.distribuicao[1]/total*100) : 0}% ${this.distribuicao[1]}`);
    console.log(`#3 ${total > 0 ? Math.floor(this.distribuicao[2]/total*100) : 0}% ${this.distribuicao[2]}`);
    console.log(`#4 ${total > 0 ? Math.floor(this.distribuicao[3]/total*100) : 0}% ${this.distribuicao[3]}`);
    console.log(`#5 ${total > 0 ? Math.floor(this.distribuicao[4]/total*100) : 0}% ${this.distribuicao[4]}`);
    console.log(`#6 ${total > 0 ? Math.floor(this.distribuicao[5]/total*100) : 0}% ${this.distribuicao[5]}`);

    write_file.save(this.jogos_jogados, this.jogos_ganhos, this.percentagem_ganhos, 
        this.melhor_tentativa, this.sequencia_atual, this.melhor_sequencia, 
        this.distribuicao);

        console.log(`\nA palavra a adivinhar é ${word}\n`);
}

function calculateSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

module.exports = { output, jogos_jogados, jogos_ganhos, percentagem_ganhos,
melhor_tentativa, sequencia_atual, melhor_sequencia, distribuicao }