const readline = require("readline");
const fs = require("fs");
const insert_word = require("./insert_word.js");
const read_file = require("./read_file.js");
const statistics = require('./statistics.js');
const keyboard = require("./keyboard.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function generateWord(words) {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
}

const main = async () => {
    var tries = 6;
    // Load remote dictionary
    var data = read_file.readFile();
    // Load persistent data from JSON
    read_file.readJSON();
    var lines = [];
    var color_array = [];

    read_file.body.on('update', async function () {
        var words = read_file.body.data;

        while (true) {
            var word = generateWord(words);

            var input = "Vá inserindo a palavra a adivinhar até acertar";
            console.log(input);
            lines = ["     ", "     ", "     ", "     ", "     ", "     "];
            color_array = ["", "", "", "", "", ""];

            for (let index = 0; index < tries;) {
                console.clear();
                keyboard.colorize_keyboard(color_array, lines);
                statistics.output(word);
                var result = await insert_word.insertWord(word, words, rl, lines, index, color_array);
                if (result == undefined)
                    index++;
                if (result == true) {
                    statistics.jogos_ganhos++;
                    statistics.sequencia_atual++;
                    // Melhor sequência
                    if (statistics.sequencia_atual > statistics.melhor_sequencia)
                        statistics.melhor_sequencia = statistics.sequencia_atual;
                    // Melhor tentativa
                    if (statistics.melhor_tentativa == 0 || index+1 < 
                        statistics.melhor_tentativa)
                        statistics.melhor_tentativa = index+1;
                    statistics.distribuicao[index]++;
                    break;
                }
            }
            if (!result)
                statistics.sequencia_atual = 0;
            statistics.jogos_jogados++;

            statistics.output(word);
            keyboard.reset_keyboard();
            
        }

        rl.close()
    });
}

main();