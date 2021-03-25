const express = require('express');
const passport = require('passport');
const routers = express.Router();
const mysql = require('mysql');

const conexion = require('../database');
const { Error } = require('mongoose');
const { compare } = require('bcryptjs');

conexion.query('select username, password from tbl_app_users ', function (error, results, fields) {


    if (error)
        throw error;

    results.forEach(results => {
        console.log(results);

    });
})


routers.get('/login', async (req, res) => {

    const usuario = req.query.usuario;
    const clave = req.query.clave;

    if(usuario && clave){
        conexion.query('SELECT * FROM tbl_app_users  WHERE username = "' + usuario + '" and password = "'+clave+'"' , async (error, results, fields) => {

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

    const usuario = req.query.usuario;
    const clave = req.query.clave;


    conexion.query('INSERT INTO tbl_app_users SET ?', { username: usuario, password: clave }, async (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('exitoso')
        }
    })

    res.send(usuario + ' ' + clave);

})

routers.get('/eliminar', async (req, res) => {

    const usuario = req.query.usuario;

    conexion.query('DELETE FROM tbl_app_users WHERE username = "' + usuario + '"');
    let eliminado = 'eliminado';
    res.send(eliminado);

})


module.exports = routers;