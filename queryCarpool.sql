/* select * from platillos inner join categoria on categoria.id = platillos.categoriaId; */

/* busca reserva por usuario  */
select nombre, apellido, telefono, dirOrigen, dirDestino from inforeserva inner join usuario on usuario.idUsuario = inforeserva.idUsuario2;

/* ver las inscripciones de vehiculos */
select nombre, apellido, telefono, dirOrigen, dirDestino, placaCarro from inscribir inner join	usuario on usuario.idUsuario = inscribir.idUsuario3;

/* buscar carpooler en mi ruta */ 
select nombre, apellido, telefono, dirOrigen, dirDestino, placaCarro from usuario where dirOrigen = 'clle 78 # 89-00' and carpooler in ( 1 );