import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {CalculadoraComponent} from '../../calculadora/calculadora.component';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
 

export class CalculatorService {
  

  constructor( private http:HttpClient ) { 

  }


  getsuma<T>(numerouno, numerodos): Observable<T>{

  return this.http.get('http://localhost:3000/sumar?operadoruno='+numerouno+'&operadordos='+numerodos).pipe(map((response)=>response as T));
  
  }

}
