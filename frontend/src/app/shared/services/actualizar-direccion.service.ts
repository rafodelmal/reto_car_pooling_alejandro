import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDireccionService {

  constructor(private http: HttpClient) { }

  postDireccion<T>(dirOrigen, dirDestino, horaSalidaDestino, horaSalidaOrigen, placa, carpooler, email): Observable<T> {


    console.log("carppooler en service", carpooler )
    console.log("dirDestino en service", dirDestino )
    console.log("horaSalidaOrigen en service", horaSalidaOrigen )
    console.log("horaSalidaDestino en service", horaSalidaDestino)
    console.log("placaCarro en service", placa)

/*let x = this.http.get('http://localhost:3000/actualizarDireccion?email='+email+'&dirOrigen='+dirOrigen+'&dirDestino='+dirDestino+'&horaSalidaOrigen='+horaSalidaOrigen+'&horaSalidaDestino='+horaSalidaDestino+'&placaCarro='+placa).pipe(map((response) => response as T));
 

console.log("valor de xxxxxxxxxxxxxxxxx",x)

return x */

    //'&carpooler='+carpooler)


  console.log("prueba service", dirOrigen)

  return  this.http.get('http://localhost:3000/prueba?email='+email+'&dirOrigen='+dirOrigen).pipe(map((response) => response as T));

 


  }


}
