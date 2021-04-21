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

       conexion.query('SELECT * FROM usuario WHERE email ="'+email+'" and clave ="'+clave+'"' , async (error, results, fields) => {

            
            if (results.length == 0)
            {
                let x = "0"
                res.send(x);
            }else{
                res.send(results);
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

         let respuesta;

    conexion.query('UPDATE usuario SET email ="'+email+'", nombre="'+nombre+'", apellido="'+apellido+'", telefono="'+telefono+'" , documento="'+documento+'"  WHERE email ="'+email+'"', async (error, results) => {

        if (email===''||nombre===''||apellido===''||telefono===''||documento==='') {
            respuesta = "0"
            res.send(respuesta);  
            console.log(respuesta)
        } else {
            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        }
    })

   // res.send(respuesta);        
})


// actualizar usuario /////

routers.get('/actualizarDireccion', async (req, res) => {

    const email = req.query.email;
    const dirOrigen = req.query.dirOrigen;
    const dirDestino = req.query.dirDestino;
    const horaSalidaOrigen = req.query.horaSalidaOrigen;
    const horaSalidaDestino = req.query.horaSalidaDestino;
    const placaCarro = req.query.placaCarro;
    const carpooler = req.query.carpooler;

    const datos = [{dirOrigen,
        email,
        dirDestino,
        horaSalidaOrigen,
        horaSalidaDestino, 
        placaCarro,
        carpooler}];


    conexion.query('UPDATE usuario SET dirOrigen="'+dirOrigen+'", dirDestino="'+dirDestino+'", horaSalidaOrigen="'+horaSalidaOrigen+'", horaSalidaDestino="'+horaSalidaDestino+'" , placaCarro="'+placaCarro+'"  WHERE email= "'+email+'"'   , async (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('Actualizacion exitosa')
            console.log(datos);
        }
        
    })
    res.send(datos);


    //, carpooler =" ' +carpooler+ '" 
})


routers.put('/prueba/:email', (req, res) => {
    collection.findOneAndUpdate(
        { email: req.params.email },
        {
            $set: {
                dirOrigen: req.body.dirOrigen
            }
        },
        {
            upsert: true
        }
    ).then(result => { res.json('Updated') })
        .catch(error => console.error(error))
});

/* routers.put('/prueba', async (req, res) => {

    const email = req.query.email;
    const dirOrigen = req.query.dirOrigen;

    const datos = [{dirOrigen,
        email}];

        console.log(dirOrigen);

    conexion.query('UPDATE usuario SET dirOrigen ="'+dirOrigen+'"  WHERE email ="'+email+'"', async (error, results) => {
        if (error) {
            throw error
        } else {
            console.log('Actualizacion exitosa')
            console.log(datos);
        }
        
    })
    res.send(datos);


    //, carpooler =" ' +carpooler+ '" 
}) */


///  ver informaciond e usurio ////
routers.get('/infoReservas', async (req, res) => {

    const carpooler = req.query.carpooler;

    conexion.query('SELECT nombre,documento, telefono, total FROM `inforeserva` INNER JOIN usuario on usuario.idUsuario = inforeserva.idUsuario2 WHERE  usuario.carpooler="'+carpooler+'"' , async (error, results, fields) => {
        
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