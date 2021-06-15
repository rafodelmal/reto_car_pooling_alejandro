import { Component, OnInit, Input } from '@angular/core';
import { ActualizarUsuarioService } from '../shared/services/actualizar-usuario.service';
import { empty, from } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
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

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

      this.nombre = recuperarStorage.nombre
      this.apellido = recuperarStorage.apellido;
      this.telefono = recuperarStorage.telefono;
      this.documento = recuperarStorage.documento;
      this.email = recuperarStorage.email;
      this.foto = recuperarStorage.foto;


      console.log(recuperarStorage.foto)

   


  }

  actualizarUsuario(){
    
    let nombre1 = this.nombre;
    let apellido1 = this.apellido;
    let documento1 = this.documento;
    let telefono1 = this.telefono;
    let email1 = this.email;

    let x = this.emailbase;
    

    console.log(x)
    console.log(nombre1 + ' ' + apellido1 + ' ' + documento1 + ' ' + telefono1 + ' ' + email1)

    
    
    let respuesta;

    localStorage.setItem("datosSesion.telefono", this.telefono );

    this.service.postUsuario(email1, nombre1, apellido1, documento1, telefono1).subscribe(data=> {

      let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

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

     

      recuperarStorage.nombre = this.nombre;
      recuperarStorage.apellido = this.apellido;
      recuperarStorage.telefono = this.telefono;
      recuperarStorage.documento = this.documento;

      localStorage.setItem("datosSesion", JSON.stringify(recuperarStorage));

      

    })


    


   }



}


