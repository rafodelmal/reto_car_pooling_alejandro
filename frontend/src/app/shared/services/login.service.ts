import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  getlogin<T>(usuario1, clave1): Observable<T> {

    return this.http.get('http://localhost:3000/login?usuario='+usuario1+'&clave='+clave1).pipe(map((response) => response as T));

  }

}
