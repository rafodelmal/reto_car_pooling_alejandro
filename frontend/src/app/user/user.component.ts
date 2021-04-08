import { Component, OnInit, Input } from '@angular/core';
import { ActualizarUsuarioService } from '../shared/services/actualizar-usuario.service';
import { empty, from } from 'rxjs';
import { Router } from '@angular/router';
import { InfoUsuarioService } from '../shared/services/info-usuario.service';
import { LoginService } from 'app/shared/services/login.service';
import { DatosUsuario } from 'app/login/login.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {


  emailbase: any;
  nombre: any;
  apellido: any;
  telefono: any;
  documento: any;
  email: any;

  resultadoBusqueda: any;

  resultado = {

    nombre2: null,
    apellido2: null,
    email2: null,
    telefono2: null,
    documento2: null

  }
  
  /* dirOrigen: any;
   dirDestino: any;
   horaSalidaOrigen: any;
   horaSalidaDestino: any;
   placa: any;
   tienePlaca: any; */




  constructor(private service: ActualizarUsuarioService, private router: Router, private serviceinfo: InfoUsuarioService) { }


  ngOnInit(): void {
  }


 /* showNotification(from, align) {
    const type = ['', 'info'];

    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({
      icon: "pe-7s-gift",
      message: "Datos actualizados correctamente."
    }, {
      type: type[color],
      timer: 1000,
      placement: {
        from: from,
        align: align
      }
    });
  }*/


  actualizarUsuario(from, align){

    let nombre1 = this.nombre;
    let apellido1 = this.apellido;
    let documento1 = this.documento;
    let telefono1 = this.telefono;
    let email1 = this.email;

    let x = this.emailbase;
    

    /* let dirOrigen1 = this.dirOrigen;
    let dirDestino1 = this.dirDestino;
    let horaSalidaDestino1 = this.horaSalidaDestino;
    let horaSalidaOrigen1 = this.horaSalidaOrigen;
    let placa1;
    let tienePlaca1; */


    // condicional apra enviar la placa a la Bd si es o no carpooler
    /* if (this.tienePlaca === '1'){
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
      */
    console.log(x)
    console.log(nombre1 + ' ' + apellido1 + ' ' + documento1 + ' ' + telefono1 + ' ' + email1)

    

    if (nombre1 == null || apellido1 == null || documento1 == null || telefono1 == null || email1 == null){


      const type = ['info','success','warning','danger'];

        var color = Math.floor(3);
        $.notify({
          icon: "pe-7s-close",
          message: "No fue posible actualizar los datos"
        }, {
          type: type[color],
          timer: 1000,
          placement: {
            from: from,
            align: align
          }
        });

    }else{


      this.service.postUsuario(email1, nombre1, apellido1, documento1, telefono1).subscribe(data=>
        this.resultadoBusqueda=data);
  
        console.log(this.resultadoBusqueda);
  
          const type = ['info','success','warning','danger'];
  
          var color = Math.floor(0);
          $.notify({
            icon: "pe-7s-check",
            message: "Datos actualizados correctamente."
          }, {
            type: type[color],
            timer: 1000,
            placement: {
              from: from,
              align: align
            }
          });
  
  
          this.router.navigate(['/carpool'])


      }


   }


   
  infousuario() {

    let nombre1 = this.nombre;
    let apellido1 = this.apellido;
    let documento1 = this.documento;
    let telefono1 = this.telefono;
    let email1 = this.email;
    let clave;

    this.serviceinfo.getInfoUsuario(email1, nombre1).subscribe(data => {
      this.nombre = data;

      console.log(this.nombre);

    });

  }


}


