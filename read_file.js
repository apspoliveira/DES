const https = require('https');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

body.data = [];

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
        //console.log(`statusCode: ${res.statusCode}`);
        var prev_length = 0;
        var new_length = 0;

        res.on('data', d => {
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

module.exports = { readFile, body };