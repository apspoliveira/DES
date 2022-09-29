const readline = require("readline");
const fs = require("fs");
const insert_word = require("./insert_word.js");
const read_file = require("./read_file.js");
const statistics = require('./statistics.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function generateWord(words) {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
}

const main = async () => {
    var data = read_file.readFile();

    read_file.body.on('update', async function () {
        words = read_file.body.data;

        while (true) {
            var tries = 6;

            var word = generateWord(words);

            var input = "Vá inserindo a palavra a adivinhar até acertar";
            console.log(input);

            for (let index = 0; index < tries;) {
                var result = await insert_word.insertWord(word, words, rl);
                if (result == undefined)
                    index++;
                if (result == true)
                    break;
            }
            statistics.jogos_jogados++;
            rl.close()

            console.log(`A palavra a adivinhar era ${word}`);
        }
    });
}

main();