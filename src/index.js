const express = require('express');
const server = express();

const rodando = false;
const minutos = 0;
const segundos = 0;

let  setIntervaloDisparado = false;

function iniciarCronometro() {
    rodando = true;
    if (!setIntervaloDisparado) {
        setInterval(() => {
            if (rodando) {
                if (segundos === 59) {
                    segundos = 0;
                    minutos++
                }
            }
        }, 1000);

        setIntervaloDisparado = true;
    }
}

server.get('/', (req, res) => {
    return res.send(`Tempo atual do cronômetro: ${minutos.toString().padStart(2, "0")} minutos e ${segundos.toString().padStart(2, "0")} segundos`)
});

server.get('/iniciar', (req, res) => {
    iniciarCronometro();
    return res.send('Cronometro Iniciado')
});

server.get('/pausar', (req, res) => {
    rodando = false;
    return res.send('Cronometro pausado')
});

server.get('/continuar', (req, res) => {
    rodando = true;
    return res.send('Cronometro continuado')
});

server.get('/zerar', (req, res) => {
    minutos = 0;
    segundos = 0;

});


server.listen(8000);
