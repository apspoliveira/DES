const readline = require("readline");
const fs = require("fs");
const https = require('https');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

body.data = [];

//var words = []; 
/* ['power', 'flash', 'dream', 'click', 'clock', 'bread', 
    'brand', 'breed', 'brain', 'audio', 'apple', 'anger', 'adult',
    'actor', 'beach', 'giant', 'funny', 'human', 'level', 'march'];*/

// show list of letters not present in word
function showList() {

}

function readFile() {
    let data = '';
    console.log("read file");

    // https://raw.githubusercontent.com/apspoliveira/DES/main/words.txt
    const options = {
        host: 'raw.githubusercontent.com',
        path: '/fserb/pt-br/master/palavras',
        method: 'GET',
      };

      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);
        var prev_length = 0;
        var new_length = 0;
        
        res.on('data', d => {
            /*for (var i = 0; i < 1; i++) {
                console.log(d.toString()[i]);
            }*/
            //data += d.toString();

            var data = d.toString().split(/\r?\n/);
            var list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].length == 5)
                    list.push(data[i]);
            }
            body.data = body.data.concat(list);
          
            // when all data have been read
            if (body.data.length > 19200) 
                body.emit('update');
            //console.log(body.data.length);

            //console.log(body.data);
        });
      });
      
      req.on('error', error => {
        console.error(error);
      });
      
      req.end();

      
}

const insertWord = (word, words) => {
    var input = "Insira a palavra a adivinhar\n";

    return new Promise((resolve, reject) => {

        rl.question(input, function (answer) {

            // dictionary does not contain the word
            const match = words.filter(item => {
                return item.includes(answer);
            });
            console.log(match.length);
            if (match.length == 0) {
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
                        console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
                        console.log(`${answer[i]} está no sítio`);
                    }
                    else if (word.includes(answer[i])) {
                        console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
                        console.log(`${answer[i]} existe mas está fora do sítio`)
                    }
                    else {
                        console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
                        console.log(`${answer[i]} não existe na palavra`)
                    }
                }
            }
            resolve();
        })
    });
}

function generateWord(words) {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
}

const main = async () => {
    var data = readFile();

    body.on('update', async function () {
        words = body.data;

        var tries = 6;

        var word = generateWord(words);

        for (let index = 0; index < tries;) {
            var result = await insertWord(word, words);
            if (result == undefined)
                index++;
            if (result == true)
                break;
        }
        rl.close()
    
        console.log(`A palavra a adivinhar era ${word}`);
    });
}

main();