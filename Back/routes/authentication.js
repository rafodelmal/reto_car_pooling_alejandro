const express = require('express');
const passport = require('passport');
const routers = express.Router();
const mysql = require('mysql');

const conexion = require('../database');
const { Error } = require('mongoose');
const { compare } = require('bcryptjs');
const e = require('cors');


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

routers.put('/actualizarUsuario', async (req, res) => {

    const email = req.body.email;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const documento = req.body.documento;

    const datos = [{email,
         nombre,
         apellido,
         telefono, 
         documento}];

         let respuesta;
 
        if (email===''||nombre===''||apellido===''||telefono===''||documento==='') {

            respuesta = "0"
            res.send(respuesta);  
            console.log(respuesta)

        } else {

            conexion.query('UPDATE usuario SET email ="'+email+'", nombre="'+nombre+'", apellido="'+apellido+'", telefono="'+telefono+'" , documento="'+documento+'"  WHERE email ="'+email+'"', async (error, results) => {
           
            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)

        })
    }  
})


// actualizar Direccion /////

routers.put('/actualizarDireccion', async (req, res) => {

    const email = req.body.email;
    const dirOrigen = req.body.dirOrigen;
    const dirDestino = req.body.dirDestino;
    const horaSalidaOrigen = req.body.horaSalidaOrigen;
    const horaSalidaDestino = req.body.horaSalidaDestino;
    const placaCarro = req.body.placaCarro;
    const carpooler = req.body.carpooler;
    const diasServicio = req.body.diasServicio;
    const total = req.body.total;
    const cupos = req.body.cupos;

    const datos = [{dirOrigen,
        email,
        dirDestino,
        horaSalidaOrigen,
        horaSalidaDestino, 
        placaCarro,
        cupos,
        carpooler,
        total,
        diasServicio}];

        let respuesta;

        if (dirDestino==='' || dirOrigen==='' || horaSalidaDestino==='' || horaSalidaOrigen==='') {
            respuesta = "0"
            res.send(respuesta);  
            console.log(respuesta)
        } else {

          /*  conexion.query('UPDATE usuario SET dirOrigen="'+dirOrigen+'", dirDestino="'+dirDestino+'", horaSalidaOrigen="'+horaSalidaOrigen+'", horaSalidaDestino="'+horaSalidaDestino+'", placaCarro="'+placaCarro+'", carpooler="'+carpooler+'", total="'+total+'", diasServicio="'+diasServicio+'" WHERE email="'+email+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(results);  
            console.log(results)
        }) */


        conexion.query('UPDATE usuario SET dirOrigen="'+dirOrigen+'", dirDestino="'+dirDestino+'", horaSalidaOrigen="'+horaSalidaOrigen+'", horaSalidaDestino="'+horaSalidaDestino+'" , placaCarro="'+placaCarro+'", cupos="'+cupos+'", carpooler="'+carpooler+'", total="'+total+'", diasServicio="'+diasServicio+'" WHERE email="'+email+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(datos);  
            console.log(datos)
        })
        
    }
})


// actualizar cupos del carpooler 

routers.put('/actualizarCupos', async (req, res) => {

    const cupos = req.body.cupos;
    const email = req.body.email;


    const datos = [{
        cupos,
        email
    }];

        let respuesta;


        conexion.query('UPDATE usuario SET cupos="'+cupos+'" WHERE email="'+email+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send("actualizarCupos", datos);  
            console.log("actualizarCupos", datos)
        })
        
    
})

// actualizar cupos de reserva de usuario
routers.put('/actualizarCuposUsuario', async (req, res) => {

    const email = req.body.email;
    const cuposReserva = req.body.cuposReserva;


    const datos = [{
        email,
        cuposReserva
    }];

        let respuesta;


        conexion.query('UPDATE usuario SET cuposReserva="'+cuposReserva+'" WHERE email="'+email+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send("actualizarCupos", datos);  
            console.log("actualizarCupos", datos)
        })
        
    
})


// actualiza cupos del usuario /////

routers.put('/cuposUsuario', async (req, res) => {

    const emailCliente = req.body.emailCliente;
    const cuposReserva = req.body.cuposReserva;
    
        let respuesta;

            conexion.query('UPDATE usuario SET cuposReserva="'+cuposReserva+'" WHERE email="'+emailCliente+'"', async (error, results) => {

            console.log('Actualizacion cuposUsuario exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
        
})


// actualiza cupos del carpooler /////

routers.put('/cuposCarpooler', async (req, res) => {

    const emailCarpooler = req.body.emailCarpooler;
    const cuposCancelar = req.body.cuposCancelar;

        let respuesta;

            conexion.query('UPDATE usuario SET cupos="'+cuposCancelar+'" WHERE email="'+emailCarpooler+'"', async (error, results) => {

            console.log('Actualizacion cuposCarpooler exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
})


// elimina la reserva del cliente /////

routers.put('/actualizarReservas', async (req, res) => {

    const reserva = req.body.reserva;
    const emailCliente = req.body.emailCliente;
    const idUsuario2 = req.body.idUsuario2;
    

        let respuesta;

        if (reserva===0) {
            respuesta = "0"
            res.send(respuesta);  
            console.log(respuesta)
        } else {

            conexion.query('UPDATE inforeserva SET reserva="'+reserva+'" WHERE idUsuario2="'+idUsuario2+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
        
    }
})


// elimina la reserva de la inscripcion  ///// //////////////////////////   este hay que modificarlo para que lea el id

routers.put('/actualizarinscribir', async (req, res) => {

    const inscribir = req.body.inscribir;
    const emailCarpooler = req.body.emailCarpooler;

        let respuesta;

        if (inscribir===0) {
            respuesta = "0"
            res.send(respuesta);  
            console.log(respuesta)
        } else {

            conexion.query('UPDATE inscribir SET inscribir="'+inscribir+'" WHERE emailCarpooler="'+emailCarpooler+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
        
    }
})



// reservar servicio /////

routers.put('/reservaSericio', async (req, res) => {

    const reserva = req.body.reserva;
    const emailCliente = req.body.emailCliente;

        let respuesta;

        if (reserva===0) {
            respuesta = "0"
            res.send(respuesta);  
            console.log(respuesta)
        } else {

            conexion.query('UPDATE inforeserva SET reserva="'+reserva+'" WHERE emailCliente="'+emailCliente+'"', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
        
    }
 //   res.send(datos);

})




// crear una nueva inscripcion e informacion en la reserva /////

routers.post('/crearReserva', async (req, res) => {

    // tabla reserva
    const reserva = req.body.reserva;
    const emailCliente = req.body.emailCliente;
    const idUsuario2 = req.body.idUsuario2;
    
    
        conexion.query('INSERT INTO inforeserva SET reserva="'+reserva+'", emailCliente="'+emailCliente+'", idUsuario2="'+idUsuario2+'"  ', async (error, results)=> {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
})


routers.post('/crearInscripcion', async (req, res) => {


    // tabla inscripcion
    const inscribir = req.body.inscribir;
    const idUsuario3 = req.body.idUsuario3;
    const emailCarpooler = req.body.emailCarpooler;


          conexion.query('INSERT INTO inscribir SET inscribir="'+inscribir+'", idUsuario3="'+idUsuario3+'", emailCarpooler="'+emailCarpooler+'"  ', async (error, results) => {

            console.log('Actualizacion exitosa')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
})

////// link de prueba ///////
routers.put('/prueba', async (req, res) => {

    const email = req.body.email;
    const dirOrigen = req.body.dirOrigen;

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
})


// buscar reservas hechas
///  ver informacion de reservas ////
routers.get('/buscarReserva', async (req, res) => {

    const idUsuario3 = req.query.idUsuario3;
    const emailCarpooler = req.query.emailCarpooler;
    const inscribir = req.query.inscribir;

    conexion.query('SELECT * FROM inscribir WHERE inscribir="'+inscribir+'" and idUsuario3="'+idUsuario3+'" and emailCarpooler="'+emailCarpooler+'"', async (error, results, fields) => {
        
        if (error)
        throw error;


    results.forEach(results => {
        console.log(results);
    });

    if (results == '') {
        res.send("2")
        
    }else{
        res.send("3")
    }

        

    })    
})


///  ver informacion de reservas ////
routers.get('/infoReservas', async (req, res) => {

    const reserva = req.query.reserva;
    const email = req.query.email;
    const idCarpooler = req.query.idCarpooler;

    conexion.query('SELECT * FROM inforeserva INNER JOIN usuario on usuario.idUsuario = inforeserva.idUsuario2 WHERE inforeserva.reserva="'+reserva+'" and inforeserva.emailCliente="'+email+'"', async (error, results, fields) => {
        
        if (error)
        throw error;

    results.forEach(results => {
        console.log(results);
    });

    res.send(results)

    })    
})

 
///  Dias de reserva que hace el usuario ////
routers.get('/diasReservas', async (req, res) => {

    const inscribir = req.query.inscribir;
    const idUsuario3 = req.query.idUsuario3;


    conexion.query('SELECT * FROM inscribir WHERE idUsuario3="'+idUsuario3+'" and inscribir="'+inscribir+'"  ', async (error, results, fields) => {
        
        if (error)
        throw error;

    results.forEach(results => {
        console.log(results);
    });

    res.send(results)

    })    
})  


routers.get('/infoReservasCarpooler', async (req, res) => {

    const inscribir = req.query.inscribir;
    const email = req.query.email;

    conexion.query('SELECT * FROM inscribir inner join usuario on usuario.idUsuario = inscribir.idUsuario3 WHERE inscribir.emailCarpooler="'+email+'" and inscribir.inscribir="'+inscribir+'"', async (error, results, fields) => {
        
        if (error)
        throw error;

    results.forEach(results => {
        console.log(results);
    });

    res.send(results)

    })    
})



///  ver informacion de carpooling ////
routers.get('/infocarpooling', async (req, res) => {

    const carpooler = req.query.carpooler;
    const email = req.query.email;

    conexion.query('SELECT * FROM usuario WHERE carpooler="'+carpooler+'" and usuario.email!="'+email+'"' , async (error, results, fields) => {
        
        if (error)
        throw error;

    results.forEach(results => {
        console.log(results);
    });

    res.send(results)

    })    
})


// elliminar usuario ///
routers.get('/eliminar', async (req, res) => {

    const email = req.query.email;

    conexion.query('DELETE FROM usuario WHERE email = "' + email + '"');
    let eliminado = 'eliminado';
    res.send(eliminado);

})


// crea nuevo usuario /////

routers.post('/registrar', async (req, res) => {

    // tabla reserva
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const documento = req.body.documento;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const clave = req.body.clave;

    
        conexion.query('INSERT INTO usuario SET nombre="'+nombre+'", apellido="'+apellido+'", documento="'+documento+'" , telefono="'+telefono+'", email="'+email+'", clave="'+clave+'" ', async (error, results)=> {

            console.log('Registro exitoso')
            respuesta = "1"
            res.send(respuesta);  
            console.log(respuesta)
        })
})


module.exports = routers;