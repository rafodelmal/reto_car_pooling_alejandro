import { Component, OnInit } from '@angular/core';
import { ActualizarUsuarioService } from '../shared/services/actualizar-usuario.service';
import { LoginComponent } from 'app/login/login.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {


  nombre: string;
  apellido: string;
  telefono: any;
  documento: any;
  email: any;
  dirOrigen: any;
  dirDestino: any;
  horaSalidaOrigen: any;
  horaSalidaDestino: any;
  placa: any;
  tienePlaca: any;



  constructor(private service: ActualizarUsuarioService) { }

  ngOnInit(): void {
  }


  showNotification(from, align) {
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
  }


actualizarUsuario(){

  let nombre1 = this.nombre;
  let apellido1 = this.apellido;
  let documento1 = this.documento;
  let telefono1 = this.telefono;
  let email1 = this.email;
  let dirOrigen1 = this.dirOrigen;
  let dirDestino1 = this.dirDestino;
  let horaSalidaDestino1 = this.horaSalidaDestino;
  let horaSalidaOrigen1 = this.horaSalidaOrigen;
  let placa1 = this.placa;
  let tienePlaca1 = this.tienePlaca;

  console.log(nombre1 + apellido1 + documento1 + telefono1 + email1 + dirOrigen1 + dirDestino1 + horaSalidaDestino1 + horaSalidaOrigen1 + placa1 + tienePlaca1 )



}


}
