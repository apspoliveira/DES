const keyboard_line1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const keyboard_line2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const keyboard_line3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const color_line1 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m '];
const color_line2 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m '];
const color_line3 = ['\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m ',
    '\x1b[37m%s\x1b[0m ', '\x1b[37m%s\x1b[0m '];

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
                    update_keyboard(answer[i], `\x1b[32m%s\x1b[0m `);
                }
                else if (word.includes(answer[i])) {
                    colors += "\x1b[33m%s\x1b[0m ";
                    update_keyboard(answer[i], `\x1b[33m%s\x1b[0m `);
                }
                else {
                    colors += "\x1b[90m%s\x1b[0m ";
                    update_keyboard(answer[i], `\x1b[90m%s\x1b[0m `);
                }

                characters.push(`${answer[i]} `);
            }
            colorize_keyboard(colors, characters);
            var equal = String(answer).localeCompare(word);
            if (equal == 0) {
                console.log("Acertou na palavra a adivinhar");
                resolve(true);
            }
            resolve();
        })
    });
}

function update_keyboard(word, color) {
    for (var i = 0; i < keyboard_line1.length; i++) {
        if (keyboard_line1[i] == word)
            color_line1[i] = color;
    }
    for (var i = 0; i < keyboard_line2.length; i++) {
        if (keyboard_line2[i] == word)
            color_line2[i] = color;
    }
    for (var i = 0; i < keyboard_line3.length; i++) {
        if (keyboard_line3[i] == word)
            color_line3[i] = color;
    }
}

function colorize_keyboard(colors, characters) {
    // log word hints
    console.log(colors, characters[0], characters[1],
        characters[2], characters[3], characters[4]);
    // log keyboard hints
    // line 1
    console.log(color_line1[0] + color_line1[1] + color_line1[2] +
        color_line1[3] + color_line1[4] + color_line1[5] +
        color_line1[6] + color_line1[7] + color_line1[8] +
        color_line1[9], keyboard_line1[0], keyboard_line1[1],
        keyboard_line1[2], keyboard_line1[3], keyboard_line1[4],
        keyboard_line1[5], keyboard_line1[6], keyboard_line1[7],
        keyboard_line1[8], keyboard_line1[9]);
    // line 2
    console.log(color_line2[0] + color_line2[1] + color_line2[2] +
        color_line2[3] + color_line2[4] + color_line2[5] +
        color_line2[6] + color_line2[7] + color_line2[8],
        keyboard_line2[0], keyboard_line2[1], keyboard_line2[2],
        keyboard_line2[3], keyboard_line2[4], keyboard_line2[5],
        keyboard_line2[6], keyboard_line2[7], keyboard_line2[8]);
    // line 3
    console.log(color_line3[0] + color_line3[1] + color_line3[2] +
        color_line3[3] + color_line3[4] + color_line3[5] +
        color_line3[6], keyboard_line3[0], keyboard_line3[1],
        keyboard_line3[2], keyboard_line3[3], keyboard_line3[4],
        keyboard_line3[5], keyboard_line3[6]);

}

module.exports = { insertWord };