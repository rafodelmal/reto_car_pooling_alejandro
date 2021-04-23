import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }


  getReservas<T>(carpooler): Observable<T> {


    return this.http.get('http://localhost:3000/infoReservas?carpooler='+carpooler).pipe(map((response) => response as T));


  }

  gatCarpooling<T>(carpooler): Observable<T> {


    return this.http.get('http://localhost:3000/infocarpooling?carpooler='+carpooler).pipe(map((response) => response as T));


  }


}
