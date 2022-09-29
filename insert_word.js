const keyboard = require("./keyboard.js");

function insertWord(word, words, rl, lines, index, color_array) {
    return new Promise((resolve, reject) => {

        rl.question("Insira palavra: ", function (answer) {

            // dictionary does not contain the word
            const match = words.filter(item => {
                return item.includes(answer);
            });

            if (match.length == 0) {
                console.error("Palavra não existe no dicionário");
                resolve(false);
                return;
            }

            var colors = "";
            
            var characters = [];
            for (let i = 0; i < answer.length; i++) {
                if (word[i] == answer[i]) {
                    colors += "\x1b[32m%s\x1b[0m ";
                    keyboard.update_keyboard(answer[i], `\x1b[32m%s\x1b[0m `);
                }
                else if (word.includes(answer[i])) {
                    colors += "\x1b[33m%s\x1b[0m ";
                    keyboard.update_keyboard(answer[i], `\x1b[33m%s\x1b[0m `);
                }
                else {
                    colors += "\x1b[90m%s\x1b[0m ";
                    keyboard.update_keyboard(answer[i], `\x1b[90m%s\x1b[0m `);
                }

                color_array[index] = colors;
                lines[index] = answer;
                characters.push(`${answer[i]} `);
            }
            keyboard.colorize_keyboard(/*colors*/color_array, /*characters*/lines);
            var equal = String(answer).localeCompare(word);
            if (equal == 0) {
                console.log("Acertou na palavra a adivinhar");
                resolve(true);
            }
            resolve();
        })
    });
}

module.exports = { insertWord };