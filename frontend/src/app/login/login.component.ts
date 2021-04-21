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
import Swal from 'sweetalert2';


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
  respuesta: any;

  constructor(private service: LoginService, private router: Router) {

    this.show = false;




  }

  ngOnInit(): void {


  }



  login() {

    let email1 = this.email;
    let clave1 = this.clave;
    let respuestaemail = 0;

    var user: User;

    console.log("valor del input email: ",email1)


    this.service.getlogin(email1, clave1).subscribe(data => {




    if (email1==='' || clave1==='' || data===0){


      console.log(data)

     Swal.fire({
        icon: 'error',
        title: '¡Error al iniciar sesión!',
        text: 'verifique usuario y clave.',
      })  

    }
    else{

      user = data[0];
      this.respuesta = user;
      console.log("datos de variable user",user)

      if(user.carpooler === 1 ){
        this.router.navigate(['/carpool']);
      }else{
        this.router.navigate(['/carpool']);
      }
      

    }
  

  

     /* if (respuestaemail == 1) {


        console.log(email1)
        console.log(this.email)

        console.log("verdadero");
        this.router.navigate(['/carpool'])


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

      }  */



    });  


  }  



  mostrarCLave() {
    this.show = !this.show;

  }


}


export class DatosUsuario {

  email: string;


}

