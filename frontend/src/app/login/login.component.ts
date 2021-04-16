import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { from, empty } from 'rxjs';
import { LoginService } from 'app/shared/services/login.service'
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { combineAll } from 'rxjs-compat/operator/combineAll';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { UserComponent } from 'app/user/user.component';
import { User } from './user';
import { runInThisContext } from 'vm';
import { isEmpty } from 'rxjs/operators';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  clave: any;
  usuarioReturn: any;
  show: boolean;

  constructor(private service: LoginService, private router: Router) {

    this.show = false;




  }

  ngOnInit(): void {


  }



  login() {

    let email1 = this.email;
    let clave1 = this.clave;
    let respuesta;
    let respuestaemail = 0;

    var user: User;

    console.log("valor del input email: ",email1)


    this.service.getlogin(email1, clave1).subscribe(data => {
      respuesta = data;

    user = data[0];


    respuesta.forEach(datos => {

        if (email1 == datos.email){


          respuestaemail = 1

        }
 
      });
  

  

      if (respuestaemail == 1) {


        console.log(email1)
        console.log(this.email)

        console.log("verdadero");


       if (respuesta) {
          this.router.navigate(['/carpool'])
        }

      } else {

        console.log("falso");

        let from = 'top', align = 'center';

        const type = ['primary', 'info', 'success', 'warning', 'danger'];

        var color = Math.floor(4);
        $.notify({
          icon: "pe-7s-close",
          message: "Error al iniciar sesión, verifique usuario y clave."
        }, {
          type: type[color],
          timer: 1000,
          placement: {
            from: from,
            align: align
          }

        });

      }



    });


  }



  mostrarCLave() {
    this.show = !this.show;

  }


}


export class DatosUsuario {

  email: string;


}

