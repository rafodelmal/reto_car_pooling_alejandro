 /*'use strict';
const   config = require('config-yml'),
        server = require('./server/index');

server.listen(config.port);
console.log('Servidor escuchando en puerto ' + config.port);

server.on('error', err => {
    console.error(err);
}); */

const cors = require('cors'); 
const express = require('express');
const app = express();app.use(cors());
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user', (req, res) => {
    res.send('¡Calculadora!')
})


app.get('/sumar', (req, res) => {

    let operador1 = req.query.operadoruno;
    let operador2 = req.query.operadordos;

   operador2 = parseInt(operador2)
   operador1 = parseInt(operador1)
    
    let suma = (operador1 + operador2);


    res.send(suma+'');
})


app.listen(port, () => {
    console.log(`Estoy escuchando por el puerto${port}`)
})

