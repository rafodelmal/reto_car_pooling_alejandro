const mysql = require('mysql');


var conexion = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT,
    user: 'root',
    password: 'root',
    database: 'carpool',
});

conexion.connect(function (error) {
    if (error) {
        nbv
        throw error;
    } else {
        console.log('conexion exitosa')
    }
});

module.exports = conexion;





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