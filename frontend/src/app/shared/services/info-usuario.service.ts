import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from 'app/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class InfoUsuarioService {

  constructor(private http: HttpClient) { }


  getInfoUsuario<T>(email1, clave1): Observable<T> {


    

    return this.http.get('http://localhost:3000/infoUsuario?email='+email1+'&clave='+clave1).pipe(map((response) => response as T));


  }



}
