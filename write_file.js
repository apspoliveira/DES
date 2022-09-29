const fs = require('fs');

function save(jogos_jogados, jogos_ganhos, percentagem_ganhos, melhor_tentativa,
    sequencia_atual, melhor_sequencia, distribuicao) {
        var data = {
            "jogos_jogados": jogos_jogados,
            "jogos_ganhos": jogos_ganhos,
            "percentagem_ganhos": percentagem_ganhos,
            "melhor_tentativa": melhor_tentativa,
            "sequencia_atual": sequencia_atual,
            "melhor_sequencia": melhor_sequencia,
            "distribuicao": distribuicao
        }

    storeData(data, "statistics.json");
}

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

module.exports = { save }