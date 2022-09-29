const https = require('https');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();
const statistics = require('./statistics.js');
const fs = require("fs");

body.data = [];

function readFile() {
    console.log("A ler dicionário...");
    let data = '';

    const options = {
        host: 'raw.githubusercontent.com',
        path:  '/fserb/pt-br/master/palavras', //'/apspoliveira/DES/master/words.txt', 
        method: 'GET',
    };

    const req = https.request(options, res => {
        res.on('data', d => {
            var data = d.toString().split(/\r?\n/);
            var list = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].length == 5)
                    list.push(data[i]);
            }
            body.data = body.data.concat(list);

            // when all data have been read
            if (body.data.length > 19200/*body.data.length >= 20*/)
                body.emit('update');
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.end();
}

// Read persistent data
function readJSON() {
    var data = JSON.parse(loadData("statistics.json"));
    statistics.jogos_jogados = data.jogos_jogados;
    statistics.jogos_ganhos = data.jogos_ganhos;
    statistics.percentagem_ganhos = data.percentagem_ganhos;
    statistics.melhor_tentativa = data.melhor_tentativa;
    statistics.sequencia_atual = data.sequencia_atual;
    statistics.melhor_sequencia = data.melhor_sequencia;
    statistics.distribuicao = data.distribuicao;
}

const loadData = (path) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (err) {
      console.error(err)
      return false
    }
  }

module.exports = { readFile, readJSON, body };