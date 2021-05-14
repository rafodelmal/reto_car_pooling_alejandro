import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrarService } from 'app/shared/services/registrar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  nombre: any;
  apellido: any;
  documento: any;
  telefono: any;
  email: any;
  clave: any;
  show: boolean;

  form
  formBuilder: any;

  constructor(private router: Router, private service: RegistrarService) { 

    this.show = false;

  }

  ngOnInit(): void {
  }

  mostrarCLave() {
    this.show = !this.show;

  }

  

  registrar(){

    let nombre = this.nombre;
    let apellido = this.apellido;
    let documento = this.documento;
    let telefono = this.telefono;
    let email = this.email;
    let clave = this.clave;
    let respuesta;


    
    if (nombre == '' || apellido == '' || documento == '' || telefono == '' || clave == '' || email == '' ){

      Swal.fire({
        icon: 'error',
        title: '¡Error al registrarse!',
        text: 'llena todos los campos.',
      }) 

    }else if (nombre == undefined || apellido == undefined || documento == undefined || telefono == undefined || clave == undefined || email == undefined ){

      Swal.fire({
        icon: 'error',
        title: '¡Error al registrarse!',
        text: 'llena todos los campos.',
      }) 

    }else{

      this.service.postRegistrar(nombre, apellido,documento,telefono,email,clave).subscribe(data => {
        respuesta = data;

        console.log(respuesta)

        if (data === 1){

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Registro exitoso',
            showConfirmButton: false,
            timer: 1300
          })
            
            this.router.navigate(['/login'])

        }
  
      });


    }

   
 

  }

}
