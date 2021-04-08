import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {


  dirOrigen: any;
  dirDestino: any;
  horaSalidaOrigen: any;
  horaSalidaDestino: any;
  placa: any;
  tienePlaca: any;

// mapas //
  title = 'gmaps';

  position = {
    lat: 6.174057,
    lng: -75.615511

  };

  label = {
    color: 'black',
    Text: 'marcador'
  };


  constructor() { }

  ngOnInit(): void {
  }


  actualizarDireccion(){


    let dirOrigen1 = this.dirOrigen;
    let dirDestino1 = this.dirDestino;
    let horaSalidaDestino1 = this.horaSalidaDestino;
    let horaSalidaOrigen1 = this.horaSalidaOrigen;
    let placa1;
    let tienePlaca1;
  
  
    // condicional apra enviar la placa a la Bd si es o no carpooler
    if (this.tienePlaca === '1'){
       placa1 = ' ';
    }else{
      placa1 = this.placa;
    }
  
    // condicional para preguntar si sera carpooler
    if (this.tienePlaca === '0' ){
  
      tienePlaca1 = 'si';
  
    }else if (this.tienePlaca === '1'){
  
      tienePlaca1 = 'no';
  
    }
    
  
   console.log(dirOrigen1 + ' ' + dirDestino1 + ' ' + horaSalidaDestino1 + ' ' + horaSalidaOrigen1 + ' ' + placa1 + ' ' + tienePlaca1 )
  
  }

}
