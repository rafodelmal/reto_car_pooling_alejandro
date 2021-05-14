import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private http: HttpClient) {

   }

  postRegistrar(nombre, apellido,documento,telefono,email,clave): Observable<any>{

    let userRegistro = {
      nombre,
      apellido,
      documento,
      telefono,
      email,
      clave
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userRegistro);

  return this.http.post('http://localhost:3000/registrar', body, {'headers': headers});

  }


}
