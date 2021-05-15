import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

@Output() datos: any;

email: any;
clave: any;
respuestaLogin: any;


  getlogin<T>(email1, clave1): Observable<T> {


    this.email = email1
    this.clave = clave1

    this.respuestaLogin = this.http.get('http://localhost:3000/login?email='+email1+'&clave='+clave1).pipe(map((response) => response as T));
    
    return this.http.get('http://localhost:3000/login?email='+email1+'&clave='+clave1).pipe(map((response) => response as T));

    

  }

}

