import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarUsuarioService {

  constructor(private http: HttpClient) { }


  postUsuario<T>(email1, nombre1, apellido1, documento1, telefono1): Observable<T> {


    

    return this.http.get('http://localhost:3000/actualizarUsuario?nombre='+nombre1+'&documento='+documento1+'&email='+email1+'&apellido='+apellido1+'&telefono='+telefono1).pipe(map((response) => response as T));


  }


}
