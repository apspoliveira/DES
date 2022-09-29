const keyboard = require("./keyboard.js");

function insertWord(word, words, rl) {
    return new Promise((resolve, reject) => {

        rl.question("", function (answer) {

            // dictionary does not contain the word
            const match = words.filter(item => {
                return item.includes(answer);
            });

            if (match.length == 0) {
                resolve(false);
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

                characters.push(`${answer[i]} `);
            }
            keyboard.colorize_keyboard(colors, characters);
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