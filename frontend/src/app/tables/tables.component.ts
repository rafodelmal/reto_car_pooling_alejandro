import { Component, Input, OnInit } from '@angular/core';
import { ReservasService } from 'app/shared/services/reservas.service';
import { User } from '../login/user';
import { data } from 'jquery';
import { LoginService } from 'app/shared/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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

  toalCarpooler: any;
  diasReservas: any;


  constructor(private service: ReservasService, private datosLogin: LoginService, private router: Router) { }


  ngOnInit(): void {


    let respuesta2
    let emailLogin2 = this.datosLogin.email;
    let claveLogin2 = this.datosLogin.clave
    var user: User;

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

    this.toalCarpooler = recuperarStorage.total

    this.carpooler = recuperarStorage.carpooler

    if (recuperarStorage.carpooler === 0) {

      let reserva = 0;
      let inscribir = 0
      let emailLogin;
      let respuesta;
      let respuesta3
      let idUsuario3 = recuperarStorage.idUsuario

      emailLogin = recuperarStorage.email

      this.service.getReservas(reserva, emailLogin).subscribe(data => {
        respuesta = data;

        console.log("respuesta de la bd", respuesta)

        this.reservas = respuesta

        console.log("emailCarpooleremailCarpooleremailCarpooler", respuesta)

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


  }

  prueba(emailcarpooler, idcarpooler,cuposcarpooler){

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));


    let cuposCancelar = cuposcarpooler + recuperarStorage.cuposReserva

    recuperarStorage.cuposReserva = 55555

    console.log("recuperarStorage", recuperarStorage)
    
    console.log("cuposcarpooler", cuposcarpooler)

    console.log("recuperarStorage.cuposReserva", recuperarStorage.cuposReserva)

    console.log("cuposCancelar", cuposCancelar)

    let emailCliente = recuperarStorage.email
    let cuposReserva = 0

    localStorage.setItem("datosSesion", JSON.stringify(recuperarStorage));

    console.log("emailCliente", emailCliente)
    console.log("emailcarpooler", emailcarpooler)
    console.log("cuposcarpooler", cuposcarpooler)
    console.log("cuposCancelar", cuposCancelar)
    console.log("cuposReserva", cuposReserva)

/*
    let respuesta2, respuesta3

    this.service.putCuposUsuarioCancelar(emailCliente, cuposReserva ).subscribe(data => {
      respuesta2 = data;

      console.log("emailCliente", emailCliente)
      console.log("cuposReserva", cuposReserva)


    });



    this.service.putCuposUsuarioCarpooler(emailcarpooler, cuposCancelar).subscribe(data => {
      respuesta3 = data;

      console.log("emailCarpooler", emailcarpooler)
      console.log("cuposCancelar", cuposCancelar)



    }); */



  }


  putReserva(email, idUsuario ,cuposcarpooler) {

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

    //tabla usuario
    let cuposCancelar = cuposcarpooler + recuperarStorage.cuposReserva
    let cuposReserva = 0

    console.log("cuposcarpooler", cuposcarpooler)
    console.log("cuposCancelar cuposCancelar cuposCancelar", cuposCancelar)

    // tabla inscribir //
    let emailCarpooler = email
    let inscribir = 1


    // tabla inforeserva //
    let reserva2 = 1;
    let emailCliente;
    let idUsuario2 = idUsuario

    let respuesta, respuesta2, respuesta3;


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


    this.service.putCuposUsuarioCancelar(emailCliente, cuposReserva ).subscribe(data => {
      respuesta2 = data;

      console.log("emailCliente", emailCliente)
      console.log("cuposReserva", cuposReserva)


    });



    this.service.putCuposUsuarioCarpooler(emailCarpooler, cuposCancelar).subscribe(data => {
      respuesta3 = data;

      console.log("emailCarpooler", emailCarpooler)
      console.log("cuposCancelar", cuposCancelar)



    });

    recuperarStorage.cuposReserva = 0;

    localStorage.setItem("datosSesion", JSON.stringify(recuperarStorage));


  }




}
