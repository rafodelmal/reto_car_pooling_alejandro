const mysql = require('mysql');


/*var conexion = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: 'root',
    password: 'root',
    database: 'carpool',
});  este local host es el de la bd  */

var conexion = mysql.createConnection({
    host: 'bupagywnyekls8xlbdky-mysql.services.clever-cloud.com',
    user: 'ueh5v097lxy4tk2m',
    password: 'dtCfIUTKUp6E3lRJncI9',
    database: 'bupagywnyekls8xlbdky',
});


conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('conexion exitosa')
    }

});





module.exports = conexion;

/*
spring.datasource.url=jdbc:sqlserver://rafosqlserver.database.windows.net:1433;database=rafosqldatabase;user=rafo@rafosqlserver;password={J82101252627x*.D};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
spring.datasource.username=rafo
spring.datasource.password=J82101252627x*.D
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
logging.level.org.hibernate.SQL=DEBUG

spring.datasource.initialization-mode=always */



/*const { connection } = require('mongoose');
const {promisify} = require('util');
const mysql = require ('mysql');

const {conexion} = require ('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {

    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('conexion con la base de datos cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('la base de datos tiene demasiadas conexiones');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('conexion fue rechazada');
        }
    }

    if (connection) connection.release();
    console.log('BD conectada');

    return;
});

pool.query = promisify(pool.query);

module.exports = pool;*/