import { Component, OnInit, Input } from '@angular/core';
import { ActualizarUsuarioService } from '../shared/services/actualizar-usuario.service';
import { empty, from } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { DatosUsuario } from 'app/login/login.component';
import { User } from '../login/user';
import Swal from 'sweetalert2';

declare var $:any;

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
  foto: any;

  resultadoBusqueda: any;
  


  constructor(private service: ActualizarUsuarioService, private router: Router, private datosLogin: LoginService) { }


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
      this.nombre = user.nombre
      this.apellido = user.apellido;
      this.telefono = user.telefono;
      this.documento = user.documento;
      this.email = user.email;
      this.foto = user.foto;


      console.log(user.foto)

    })


  }

  actualizarUsuario(from, align){

    let nombre1 = this.nombre;
    let apellido1 = this.apellido;
    let documento1 = this.documento;
    let telefono1 = this.telefono;
    let email1 = this.email;

    let x = this.emailbase;
    

    console.log(x)
    console.log(nombre1 + ' ' + apellido1 + ' ' + documento1 + ' ' + telefono1 + ' ' + email1)

    
    
    let respuesta;

    this.service.postUsuario(email1, nombre1, apellido1, documento1, telefono1).subscribe(data=> {

      respuesta=data;

      console.log("respuesta",respuesta);

      if (data===0){

        Swal.fire({
          position: 'top',
          icon: 'error',
          title: '¡No fue posible actualiar tus datos!',
          text: 'por favor verifica todos los campos.',
          showConfirmButton: false,
          timer: 1700
        })
  
      }else{
        
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Datos actualizacos con exito.',
          showConfirmButton: false,
          timer: 1300
        })
          
          this.router.navigate(['/carpool'])
  
      }



      

    })


    


   }



}


