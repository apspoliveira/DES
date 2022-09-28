const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var words = ['power', 'flash', 'dream', 'click', 'clock', 'bread', 
    'brand', 'breed', 'brain', 'audio', 'apple', 'anger', 'adult',
    'actor', 'beach', 'giant', 'funny', 'human', 'level', 'march'];

var word = generateWord();

function generateWord() {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
}

// show list of letters not present in word
function showList() {

}

const insertWord = () => {
    var input = "Insira a palavra a adivinhar\n";

    return new Promise((resolve, reject) => {

        rl.question(input, function (answer) {

            // dictionary does not contain the word
            var contains = words.filter(o => o.toLowerCase().includes(word));
            console.log(contains);
            if (!contains) {
                resolve(false);
            }
            var equal = String(answer).localeCompare(word);
            if (equal == 0) {
                console.log("Acertou na palavra a adivinhar");
                resolve(true);
            }
            else {
                for (let i = 0; i < answer.length; i++) {
                    const element = answer[i];
                    if (word[i] == answer[i]) {
                        console.log(`${answer[i]} está no sítio`);
                    }
                    else if (word.includes(answer[i])) {
                        console.log(`${answer[i]} existe mas está fora do sítio`)
                    }
                    else {
                        console.log(`${answer[i]} não existe na palavra`)
                    }
                }
            }
            resolve();
        })
    });
}

const main = async () => {
    var tries = 6;

    for (let index = 0; index < tries; index++) {
        if (await insertWord())
            break;
    }
    rl.close()
}

main()