'use strict';

const express = require('express');
const routers = express.Router();


/*const apiServices = require('../controller/index');

const routers = (app) =>{
    app.use('/api/v1',apiServices);
}; */

routers.get('/', (req, res) => {
    res.send('Hello World!');
})


routers.get('/sumar', (req, res) => {

    let operador1 = req.query.operadoruno;
    let operador2 = req.query.operadordos;

   operador2 = parseInt(operador2)
   operador1 = parseInt(operador1)
    
    let suma = (operador1 + operador2);


    res.send(suma+'');
})


module.exports = routers;