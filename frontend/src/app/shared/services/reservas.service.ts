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

  gatCarpooling<T>(carpooler, email): Observable<T> {


    return this.http.get('http://localhost:3000/infocarpooling?carpooler='+carpooler+'&email='+email).pipe(map((response) => response as T));

  }


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

}
