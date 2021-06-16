import { Component, OnInit } from "@angular/core";
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";
import { LegendItem, ChartType } from "../lbd/lbd-chart/lbd-chart.component";
import * as Chartist from "chartist";
import { User } from "../login/user";
import { ReservasService } from "app/shared/services/reservas.service";
import { LoginService } from "app/shared/services/login.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { AnyTxtRecord } from "dns";

declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public emailChartType: ChartType;
  public emailChartData: any;
  public emailChartLegendItems: LegendItem[];

  public hoursChartType: ChartType;
  public hoursChartData: any;
  public hoursChartOptions: any;
  public hoursChartResponsive: any[];
  public hoursChartLegendItems: LegendItem[];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];

  lunes: any;
  martes: any;
  miercoles: any;
  jueves: any;
  viernes: any;
  sabado: any;
  domingo: any;

  cupos: any;

  carpooler: any;

  emailCarpooler: any;
  idUsuario: any;

  idUsuarioCarpooler: any;
  emailUsuario: any;

  emailModal: any;
  idModal: any;
  cuposModal: any;

  constructor(
    private service: ReservasService,
    private datosLogin: LoginService,
    private router: Router
  ) {}

  ngOnInit() {

    let respuesta2;
    let emailLogin2 = this.datosLogin.email;
    let claveLogin = this.datosLogin.clave;
    var user: User;

    let recuperarStorage = JSON.parse(localStorage.getItem("datosSesion"));

    if (recuperarStorage.carpooler === 1) {
      Swal.fire({
        icon: "error",
        title: "¡Debes cambiar de rol!",
        text: "No puedes ser carpooler.",
        showConfirmButton: false,
        timer: 1800,
      });

      this.router.navigate(["/direcciones"]);
    }

    let carpooler = 1;
    let cupos = 0
    let respuesta;
    let emailLogin;

    emailLogin = recuperarStorage.email;

    this.service.getCarpooling(carpooler, emailLogin, cupos).subscribe((data) => {
      respuesta = data;

      console.log(respuesta);

      this.carpooler = respuesta;
    });
  }

  datosModal(idModal, emailModal, cuposModal){
 
    this.emailModal = emailModal
    this.idModal = idModal
    this.cuposModal = cuposModal

  }

  reservar(idUsuario2, emailCarpooler, cuposCarpooler) {

    console.log("idUsuario2, emailCarpooler, cuposCarpooler",idUsuario2, emailCarpooler, cuposCarpooler)

    let recuperarStorage = JSON.parse(localStorage.getItem("datosSesion"));

    let idUsuario3 = recuperarStorage.idUsuario;

    let emailLogin3;
    let inscribir2 = 0;

    this.service
      .getBuscReserva(idUsuario3, emailCarpooler, inscribir2)
      .subscribe((data) => {


        let datosReserva = data;

    
        console.log("datosReserva", datosReserva)


        if (datosReserva == 3) {


          Swal.fire({
            icon: "error",
            title: "Ooops..",
            text: "Ya cuentas con una reserva para este Carpooler.",
            showConfirmButton: false,
            timer: 1800
          });
          
        } else {


          let lunes, martes, miercoles, jueves, viernes, sabado, domingo;
          let cuposReserva = this.cupos;

          recuperarStorage.cuposReserva = cuposReserva;

          localStorage.setItem("datosSesion", JSON.stringify(recuperarStorage));


          let totalCupos;

          if (this.lunes == true) {
            lunes = "lunes-";
          } else {
            lunes = "";
          }

          if (this.martes == true) {
            martes = "martes-";
          } else {
            martes = "";
          }

          if (this.miercoles == true) {
            miercoles = "miercoles-";
          } else {
            miercoles = "";
          }

          if (this.jueves == true) {
            jueves = "jueves-";
          } else {
            jueves = "";
          }

          if (this.viernes == true) {
            viernes = "viernes-";
          } else {
            viernes = "";
          }

          if (this.sabado == true) {
            sabado = "sabado-";
          } else {
            sabado = "";
          }

          if (this.domingo == true) {
            domingo = "domingo";
          } else {
            domingo = "";
          }

          let diasReserva =
            lunes + martes + miercoles + jueves + viernes + sabado + domingo;

          if (
            cuposReserva > cuposCarpooler ||
            cuposReserva == 0 ||
            cuposReserva == "" ||
            cuposReserva == undefined ||
            cuposReserva == null
          ) {
            Swal.fire({
              icon: "error",
              title: "Sin cupos",
              text: "Verifica el cupo ingresado, por favor.",
              showConfirmButton: false,
               timer: 1800
            });
          } else {
            let respuesta3, respuesta2, respuesta;

            emailLogin3 = recuperarStorage.email;
            let claveLogin3 = recuperarStorage.clave;

            totalCupos = cuposCarpooler - cuposReserva;

            console.log("totalCupos", totalCupos);

            var user: User;

            this.datosLogin
              .getlogin(emailLogin3, claveLogin3)
              .subscribe((data) => {
                respuesta3 = data;

                user = data[0];

                // reserva
                let emailCliente = recuperarStorage.email;
                let reserva = 0;

                console.log(
                  "Datos de reserva: ",
                  emailCliente,
                  idUsuario2,
                  reserva
                );

                // inscripcion
                idUsuario3 = recuperarStorage.idUsuario;
                let inscribir = 0;

                console.log(
                  "Datos de inscribir: ",
                  emailCarpooler,
                  idUsuario3,
                  inscribir
                );

                this.service
                  .postReserva(reserva, emailCliente, idUsuario2)
                  .subscribe((data) => {
                    respuesta = data;

                    console.log(respuesta);
                  });

                this.service
                  .putCupos(totalCupos, emailCarpooler)
                  .subscribe((data) => {
                    respuesta = data;

                    console.log(respuesta);
                  });

                  this.service
                  .putCuposUsuario(emailCliente, cuposReserva)
                  .subscribe((data) => {
                    respuesta = data;

                    console.log(respuesta);
                  });

                this.service
                  .postInscripcion(inscribir, emailCarpooler, idUsuario3)
                  .subscribe((data) => {
                    respuesta2 = data;

                    console.log(respuesta2);

                    if (data === 0) {
                      Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "¡No fue posible realizar la reserva!",
                        showConfirmButton: false,
                        timer: 1700,
                      });
                    } else {
                      Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Gracias por tu reserva",
                        showConfirmButton: false,
                        timer: 1600,
                      });

                      this.router.navigate(["/reservas"]);
                    }
                  });
              });
          }

          console.log("totalDias", diasReserva);

          console.log("idUsuario2", idUsuario2);

          console.log("emailCarpooler", emailCarpooler);

          console.log("cuposCarpooler", cuposCarpooler);

          console.log("cupos", cuposReserva);

    
          
        }
      });
  }

  /*

reservar(idUsuario2, emailCarpooler){

  let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

let respuesta3,respuesta2, respuesta

let emailLogin3 = recuperarStorage.email;
let claveLogin3 = recuperarStorage.clave;

var user: User



this.datosLogin.getlogin(emailLogin3, claveLogin3).subscribe(data => {
  respuesta3 = data;

  user = data[0];

// reserva
  let emailCliente = recuperarStorage.email;
  let reserva = 0;
  
  console.log("Datos de reserva: ", emailCliente, idUsuario2, reserva)
  
  
  
  // inscripcion
  let idUsuario3 = recuperarStorage.idUsuario
  let inscribir = 0;
  
  console.log("Datos de inscribir: ", emailCarpooler, idUsuario3, inscribir)


  this.service.postReserva(reserva, emailCliente, idUsuario2).subscribe(data=> {

    respuesta = data

    console.log(respuesta)

  })



  this.service.postInscripcion(inscribir,emailCarpooler, idUsuario3).subscribe(data=> {

    respuesta2 = data

    console.log(respuesta2)

    
    if (data===0){

      Swal.fire({
        position: 'top',
        icon: 'error',
        title: '¡No fue posible realizar la reserva!',
        showConfirmButton: false,
        timer: 1700
      })

    }else{
      
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Gracias por tu reserva',
        showConfirmButton: false,
        timer: 1300
      })
        
        this.router.navigate(['/reservas'])

    }

  }) 



});


}  */
}
