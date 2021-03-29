const express = require('express');
const passport = require('passport');
const routers = express.Router();
const mysql = require('mysql');

const conexion = require('../database');
const { Error } = require('mongoose');
const { compare } = require('bcryptjs');

conexion.query('select nombre, clave, email from usuario ', function (error, results, fields) {


    if (error)
        throw error;

    results.forEach(results => {
        console.log(results);

    });
})


routers.get('/login', async (req, res) => {

    const email = req.query.email;
    const clave = req.query.clave;

    if(email && clave){
        conexion.query('SELECT * FROM usuario WHERE email = "' + email + '" and clave = "'+clave+'"' , async (error, results, fields) => {

            let login = true;

            if (results.length == 0)
            {
                login = false;
                res.send(login+'');
            }else{
                res.send(login+'');
            }

        })

    }

})


routers.get('/registrar', async (req, res) => {

    const email = req.query.email;
    const clave = req.query.clave;


    conexion.query('INSERT INTO usuario SET ?', { email: email, clave: clave }, async (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('exitoso')
        }
    })

    res.send(email + ' ' + clave);

})

routers.get('/eliminar', async (req, res) => {

    const usuario = req.query.usuario;

    conexion.query('DELETE FROM usuario WHERE email = "' + email + '"');
    let eliminado = 'eliminado';
    res.send(eliminado);

})


module.exports = routers;