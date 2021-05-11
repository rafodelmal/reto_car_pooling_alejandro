import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }


  getReservas<T>(reserva, email): Observable<T> {

    return this.http.get('http://localhost:3000/infoReservas?email='+email+'&reserva='+reserva).pipe(map((response) => response as T));

  }



  // quita una reserva de la tabla reservainfo //
  putReserva(reserva, emailCliente): Observable<any> {

    console.log("reserva service",reserva)
    console.log("correo service",emailCliente)

    let userReserva = {
      reserva,
      emailCliente
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

  getCarpooling<T>(carpooler, email): Observable<T> {

    return this.http.get('http://localhost:3000/infocarpooling?carpooler='+carpooler+'&email='+email).pipe(map((response) => response as T));

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
      idUsuario2
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userInfoReserva);

  return this.http.post('http://localhost:3000/crearReserva', body, {'headers': headers});

  }



  postInscripcion(inscribir,emailCarpooler, idUsuario3): Observable<any> {

    console.log("inscribir service",inscribir)
    console.log("correo inscribir",emailCarpooler)
    console.log("idUsuario3 inscribir",idUsuario3)

    let userInscripcion = {
      inscribir,
      idUsuario3,
      emailCarpooler
     
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userInscripcion);

  return this.http.post('http://localhost:3000/crearInscripcion', body, {'headers': headers});

  }



}
