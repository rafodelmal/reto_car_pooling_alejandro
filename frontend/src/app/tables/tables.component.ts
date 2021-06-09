import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'app/shared/services/reservas.service';
import { User } from '../login/user';
import { data } from 'jquery';
import { LoginService } from 'app/shared/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  public tableData1: TableData;
  public tableData2: TableData;

  nombre: any;
  documento: any;
  telefono: any;
  total: any;
  reservas: any;
  carpooler: any;

  constructor(private service: ReservasService, private datosLogin: LoginService, private router: Router) { }


  ngOnInit(): void {

    let respuesta2
    let emailLogin2 = this.datosLogin.email;
    let claveLogin2 = this.datosLogin.clave
    var user: User;

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

    this.carpooler = recuperarStorage.carpooler

    if (recuperarStorage.carpooler === 0) {

      let reserva = 0;
      let emailLogin;
      let respuesta;

      emailLogin = recuperarStorage.email

      this.service.getReservas(reserva, emailLogin).subscribe(data => {
        respuesta = data;

        console.log("respuesta de la bd", respuesta)

        this.reservas = respuesta
      });


    } else {

      let inscribir = 0;
      let emailLogin;
      let respuesta;

      emailLogin = recuperarStorage.email

      this.service.getCarpoolingReservas(emailLogin, inscribir).subscribe(data => {
        respuesta = data;

        console.log("respuesta de la bd", respuesta)

        this.reservas = respuesta

        console.log("getCarpoolingReservas", emailLogin)

      });

    }

    ///////

   /* this.datosLogin.getlogin(emailLogin2, claveLogin2).subscribe(data => {
      respuesta2 = data;

      user = data[0];

      this.carpooler = user.carpooler

      if (user.carpooler === 0) {

        let reserva = 0;
        let emailLogin;
        let respuesta;

        emailLogin = this.datosLogin.email

        this.service.getReservas(reserva, emailLogin).subscribe(data => {
          respuesta = data;

          console.log("respuesta de la bd", respuesta)

          this.reservas = respuesta
        });






      } else {

        let inscribir = 0;
        let emailLogin;
        let respuesta;

        emailLogin = this.datosLogin.email

        this.service.getCarpoolingReservas(emailLogin, inscribir).subscribe(data => {
          respuesta = data;

          console.log("respuesta de la bd", respuesta)

          this.reservas = respuesta

          console.log("getCarpoolingReservas", emailLogin)

        });

      }

    });*/

  }


  putReserva(email, idUsuario) {

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

    // tabla inscribir //
    let emailCarpooler = email
    let inscribir = 1


    // tabla inforeserva //
    let reserva2 = 1;
    let emailCliente;
    let idUsuario2 = idUsuario

    let respuesta, respuesta2;

    emailCliente = recuperarStorage.email


    this.service.putReserva(reserva2, emailCliente,idUsuario2).subscribe(data => {
      respuesta = data;

      console.log("respuesta de la bd", respuesta)

      this.reservas = respuesta

      if (data === 1) {

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Reserva cancelada con exito.',
          showConfirmButton: false,
          timer: 1300
        })

        this.router.navigate(['/carpool'])

      } else {

        Swal.fire({
          position: 'top',
          icon: 'error',
          title: '¡No fue posible cancelar la reserva!',
          showConfirmButton: false,
          timer: 1700
        })

      }


    });



    this.service.putInscribir(inscribir, emailCarpooler).subscribe(data => {
      respuesta2 = data;

      console.log("respuesta de la bd inscribir", respuesta2)


    });
  }




}
