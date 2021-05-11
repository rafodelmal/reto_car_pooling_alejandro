import { User } from 'app/login/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { ActualizarDireccionService } from '../shared/services/actualizar-direccion.service';
import Swal from 'sweetalert2';



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
  total: any;
  tienePlaca: any = 1;
  emaillogin: any;

  resultadoBusqueda: any;


  constructor(private service: ActualizarDireccionService, private router: Router, private datosLogin: LoginService) { }


  ngOnInit(): void {


   let emailLogin, claveLogin

    emailLogin = this.datosLogin.email
    claveLogin = this.datosLogin.clave
    this.emaillogin = emailLogin

    let respuesta;

    var user: User;

    this.datosLogin.getlogin(emailLogin, claveLogin).subscribe(data => {
      respuesta = data;

      user = data[0];

      console.log(user)

      this.dirOrigen = user.dirOrigen;
      this.dirDestino = user.dirDestino;
      this.horaSalidaDestino = user.horaSalidaDestino;

      this.horaSalidaOrigen = user.horaSalidaOrigen;
      this.total = user.total;

    
      

      if (user.carpooler === 1) {

        this.placa = user.placaCarro;

      } else {


        this.tienePlaca = 0;
        this.placa = ' ';

      }

    })


  }




  actualizarDireccion(from, align) {


    let dirOrigen1 = this.dirOrigen;
    let dirDestino1 = this.dirDestino;
    let horaSalidaDestino1 = this.horaSalidaDestino;
    let horaSalidaOrigen1 = this.horaSalidaOrigen;
    let placa1;
    let tienePlaca1 = this.tienePlaca;
    let total = this.total

    let respuesta;

         // condicional para enviar la placa a la Bd si es o no carpooler
         if (this.tienePlaca === 0) {
          placa1 = 'sin registro';
        } else {
          placa1 = this.placa;
        }


      
        this.service.postDireccion(dirOrigen1, dirDestino1, horaSalidaDestino1, horaSalidaOrigen1, placa1, tienePlaca1, this.emaillogin, total).subscribe(data=> {
          respuesta=data;


          console.log("respuesta en component", respuesta);

          if (data===0){

            Swal.fire({
              position: 'top',
              icon: 'error',
              title: '¡No fue posuble actualiar tus datos!',
              text: 'por favor verifica todos los campos.',
              showConfirmButton: false,
              timer: 1700
            })

          }else{

            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Datos actualizados con exito.',
              showConfirmButton: false,
              timer: 1300
            })

            if(tienePlaca1===1){
              this.router.navigate(['/reservas'])
            }else{
              this.router.navigate(['/carpool'])
            }
            
          }
            console.log(dirOrigen1 + ' ' + dirDestino1 + ' ' + horaSalidaDestino1 + ' ' + horaSalidaOrigen1 + ' ' + placa1 + ' ' + tienePlaca1 + ' ' + this.emaillogin)
        })
      }
  }
