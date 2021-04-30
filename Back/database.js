const { connection } = require('mongoose');
const mysql = require('mysql');


var conexion = mysql.createConnection({
    host: 'bupagywnyekls8xlbdky-mysql.services.clever-cloud.com',
    user: 'ueh5v097lxy4tk2m',
    password: 'dtCfIUTKUp6E3lRJncI9',
    database: 'bupagywnyekls8xlbdky'
});



    conexion.connect(function (error) {
        if (error) {
           throw error;
        } else {
            console.log('conexion exitosa')
            console.log(conexion.config)
        }
    
    });
    
        
    module.exports = conexion; 




