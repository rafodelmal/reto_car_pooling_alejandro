const express = require('express');
const passport = require('passport');
const routers = express.Router();
const mysql = require('mysql');

const conexion = require('../database');
const { Error } = require('mongoose');
const { compare } = require('bcryptjs');


conexion.query('select * from usuario ', function (error, results, fields) {


    if (error)
        throw error;

    results.forEach(results => {
        console.log(results);

    });
})


routers.get('/listar', async (req, res) => {



        conexion.query('SELECT * FROM usuario' , async (error, results, fields) => {
            
            if (error)
            throw error;
    
        results.forEach(results => {
            console.log(results);
    
        });

        res.send(results)

        })    
})


// hacer login ////
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
                res.send(login);
            }

        })

    }

})



// actualizar usuario /////

routers.get('/actualizarUsuario', async (req, res) => {

    const email = req.query.email;
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const telefono = req.query.telefono;
    const documento = req.query.documento;

    const datos = [{email,
         nombre,
         apellido,
         telefono, 
         documento}];


    conexion.query('UPDATE usuario SET email = "' + email + '", nombre = "' + nombre +'", apellido =" ' +apellido+ '", telefono =" ' +telefono+ '" , documento =" ' +documento+ '"  WHERE email = "' + email + '"'   , async (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('Actualizacion exitosa')
            console.log(datos);
        }
        
    })
    res.send(datos);
})




///  ver informaciond e usurio ////
routers.get('/infoUsuario', async (req, res) => {

    const email = req.query.email;-

    conexion.query('SELECT email, nombre, apellido, documento, telefono FROM usuario WHERE email = "' + email + '"' , async (error, results, fields) => {
        
        if (error)
        throw error;

    results.forEach(results => {
        console.log(results);
    });

    res.send(results)

    })    
})



// registrar usuario ///
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


// elliminar usuario ///
routers.get('/eliminar', async (req, res) => {

    const email = req.query.email;

    conexion.query('DELETE FROM usuario WHERE email = "' + email + '"');
    let eliminado = 'eliminado';
    res.send(eliminado);

})





module.exports = routers;