import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

email2: any;
clave2: any;

  getlogin<T>(email1, clave1): Observable<T> {

    return this.http.get('http://localhost:3000/login?email='+email1+'&clave='+clave1).pipe(map((response) => response as T));

  }

}
