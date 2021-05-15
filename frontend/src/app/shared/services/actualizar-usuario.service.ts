import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarUsuarioService {

  constructor(private http: HttpClient) { }


  postUsuario(email, nombre, apellido, documento, telefono): Observable<any> {


    let datosUser = {
      email,
      nombre,
      apellido,
      documento,
      telefono
    }
    
    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(datosUser);

    return this.http.put('http://localhost:3000/actualizarUsuario', body, {'headers': headers} )


  }


}
