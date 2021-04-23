import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActualizarDireccionService {

  constructor(private http: HttpClient) { }


  postDireccion(dirOrigen, dirDestino, horaSalidaDestino, horaSalidaOrigen, placaCarro, carpooler, email): Observable<any> {


    console.log("carppooler en service", carpooler )
    console.log("dirDestino en service", dirDestino )
    console.log("horaSalidaOrigen en service", horaSalidaOrigen )
    console.log("horaSalidaDestino en service", horaSalidaDestino)
    console.log("placaCarro en service", placaCarro)

/*let x = this.http.get('http://localhost:3000/actualizarDireccion?email='+email+'&dirOrigen='+dirOrigen+'&dirDestino='+dirDestino+'&horaSalidaOrigen='+horaSalidaOrigen+'&horaSalidaDestino='+horaSalidaDestino+'&placaCarro='+placa).pipe(map((response) => response as T));
 

console.log("valor de xxxxxxxxxxxxxxxxx",x)

return x */

    //'&carpooler='+carpooler)

    let userDireccion = {
      dirDestino,
      dirOrigen,
      horaSalidaDestino,
      horaSalidaOrigen,
      placaCarro,
      carpooler,
      email
    }

    const headers =  { 'content-type': 'application/json'};
    const body = JSON.stringify(userDireccion);

  console.log("prueba service", userDireccion)

  return  this.http.put('http://localhost:3000/actualizarDireccion', body, {'headers': headers});

 


  }


}
