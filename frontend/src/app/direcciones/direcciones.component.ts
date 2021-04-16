import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { User } from '../login/user';
import { ActualizarDireccionService } from '../shared/services/actualizar-direccion.service';

declare var $:any;

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
  tienePlaca: any = 1;


  constructor(private service: ActualizarDireccionService ,private router: Router, private datosLogin: LoginService) { }

  ngOnInit(): void {


    let emailLogin, claveLogin

    emailLogin = this.datosLogin.email
    claveLogin = this.datosLogin.clave

    let respuesta;

    var user: User;

    this.datosLogin.getlogin(emailLogin, claveLogin).subscribe(data => {
      respuesta=data;

      user = data[0];

      console.log(user)

      this.dirOrigen = user.dirOrigen;
      this.dirDestino = user.dirDestino;
      this.horaSalidaDestino = user.horaSalidaDestino;
      this.horaSalidaOrigen = user.horaSalidaOrigen;
      
      
      if (user.carpooler == 1){

        this.placa = user.placaCarro;

      }else{

        
        this.tienePlaca =  0 ;
        this.placa = ' ';

      }

    })


  }




 actualizarDireccion(){


  let emailLogin, claveLogin

  emailLogin = this.datosLogin.email
  claveLogin = this.datosLogin.clave

  let respuesta;

  var user: User;

  this.datosLogin.getlogin(emailLogin, claveLogin).subscribe(data => {
    respuesta=data;

    user = data[0];

    console.log(user)


    
    let emailUser = user.email

    let dirOrigen1 = this.dirOrigen;
    let dirDestino1 = this.dirDestino;
    let horaSalidaDestino1 = this.horaSalidaDestino;
    let horaSalidaOrigen1 = this.horaSalidaOrigen;
    let placa1;
    let tienePlaca1 = this.tienePlaca;
  
  
    // condicional para enviar la placa a la Bd si es o no carpooler
   if (this.tienePlaca === '0'){
       placa1 = ' ';
    }else{
      placa1 = this.placa;
    }
  

    
    
  
   console.log(dirOrigen1 + ' ' + dirDestino1 + ' ' + horaSalidaDestino1 + ' ' + horaSalidaOrigen1 + ' ' + placa1 + ' ' + tienePlaca1 + ' ' + emailUser )
  

  })



  
  } 

}
