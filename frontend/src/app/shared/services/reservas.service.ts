import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  getBuscReserva<T>(idUsuario3, emailCarpooler,inscribir2): Observable<T> {

    return this.http.get('http://localhost:3000/buscarReserva?idUsuario3='+idUsuario3+'&emailCarpooler='+emailCarpooler+'&inscribir='+inscribir2).pipe(map((response) => response as T));

  }



  getReservas<T>(reserva, email): Observable<T> {

    return this.http.get('http://localhost:3000/infoReservas?email='+email+'&reserva='+reserva).pipe(map((response) => response as T));

  }

  getInfoCuposReservados<T>(inscribir2, idUsuario3): Observable<T> {

    return this.http.get('http://localhost:3000/infoCuposReservados?idUsuario3='+idUsuario3+'&inscribir='+inscribir2).pipe(map((response) => response as T));

  }

  // Actualiza los cupos del usuario //
  putCuposUsuarioCancelar(idUsuario3, cuposReserva, emailCarpooler): Observable<any> {

    console.log("correo service",idUsuario3)

    let userCupos = {
      idUsuario3,
      cuposReserva,
      emailCarpooler
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userCupos);

  console.log("userCupos service", userCupos)

  return this.http.put('http://localhost:3000/cuposUsuario', body, {'headers': headers});

  }



    // Actualiza los cupos del carpooler //
    putCuposUsuarioCarpooler(emailCarpooler, cuposCancelar): Observable<any> {

      console.log("cuposCancelar service", cuposCancelar)
  
      let cuposCarpooler = {
        emailCarpooler,
        cuposCancelar
      }
  
      const headers =  { 'content-type': 'application/json'};
      const body = JSON.stringify(cuposCarpooler);
  
    console.log("cuposCarpooler cuposCarpooler service", cuposCarpooler)
  
    return this.http.put('http://localhost:3000/cuposCarpooler', body, {'headers': headers});
  
    }


  // quita una reserva de la tabla reservainfo //
  putReserva(reserva, emailCliente,idUsuario2): Observable<any> {

    console.log("reserva service",reserva)
    console.log("correo service",emailCliente)

    let userReserva = {
      reserva,
      emailCliente,
      idUsuario2
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userReserva);

  console.log("prueba service", userReserva)

  return this.http.put('http://localhost:3000/actualizarReservas', body, {'headers': headers});

  }

    // quita una reserva de la tabla inscribir //
    putInscribir(inscribir, emailCarpooler): Observable<any> {

      console.log("reserva service",inscribir)
      console.log("correo service",emailCarpooler)
  
      let userReserva = {
        inscribir,
        emailCarpooler
      }
  
      const headers =  { 'content-type': 'application/json'};
      const body = JSON.stringify(userReserva);
  
    console.log("prueba service", userReserva)
  
    return this.http.put('http://localhost:3000/actualizarinscribir', body, {'headers': headers});
  
    }


  // se carga informacion de reservas en tablas

  getCarpooling<T>(carpooler, email, cupos): Observable<T> {

    return this.http.get('http://localhost:3000/infocarpooling?carpooler='+carpooler+'&email='+email+'&cupos='+cupos).pipe(map((response) => response as T));

  }


  getCarpoolingReservas<T>(email,inscribir): Observable<T> {

    return this.http.get('http://localhost:3000/infoReservasCarpooler?email='+email+'&inscribir='+inscribir).pipe(map((response) => response as T));

  }


  // se crea reserva

  postReserva(reserva, emailCliente, idUsuario2): Observable<any> {

    console.log("reserva service",reserva)
    console.log("correo reserva",emailCliente)
    console.log("idUsuario2 reserva",idUsuario2)


    let userInfoReserva = {
      reserva,
      emailCliente,
      idUsuario2,
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userInfoReserva);

  return this.http.post('http://localhost:3000/crearReserva', body, {'headers': headers});

  }



  postInscripcion(inscribir,emailCarpooler, idUsuario3, cuposReserva): Observable<any> {

    console.log("inscribir service",inscribir)
    console.log("correo inscribir",emailCarpooler)
    console.log("idUsuario3 inscribir",idUsuario3)


    let userInscripcion = {
      inscribir,
      idUsuario3,
      emailCarpooler,
      cuposReserva
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userInscripcion);

  return this.http.post('http://localhost:3000/crearInscripcion', body, {'headers': headers});

  }

  putCupos(cupos,email){

    console.log("cupos service",cupos)
    console.log("email service",email)

    let totalCuposCarpooler = {
      cupos,
      email
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(totalCuposCarpooler);

  return this.http.put('http://localhost:3000/actualizarCupos', body, {'headers': headers});



  }
/*
  putCuposUsuario(idUsuario3, cuposReserva){

    console.log("cuposReserva service",cuposReserva)
    console.log("email service",idUsuario3)

    let totalCuposCarpooler = {
      idUsuario3,
      cuposReserva
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(totalCuposCarpooler);

  return this.http.put('http://localhost:3000/actualizarCuposUsuario', body, {'headers': headers});



  }
 */


}
