import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { User } from '../login/user';
import { ReservasService } from 'app/shared/services/reservas.service';
import { LoginService } from 'app/shared/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AnyTxtRecord } from 'dns';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

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

    carpooler: any;

    emailCarpooler: any;
    idUsuario: any;

    idUsuarioCarpooler: any;
    emailUsuario: any;

  constructor(private service: ReservasService, private datosLogin: LoginService, private router: Router) { }

  ngOnInit() {


     
    let respuesta2
    let emailLogin2 = this.datosLogin.email;
    let claveLogin = this.datosLogin.clave;
    var user: User;


    this.datosLogin.getlogin(emailLogin2, claveLogin).subscribe(data => {
      respuesta2 = data;

      user = data[0];


      if(user.carpooler===1){

        Swal.fire({
          icon: 'error',
          title: '¡Debes cambiar de rol!',
          text: 'No puedes ser carpooler.',
          showConfirmButton: false,
          timer: 1800
        })

        this.router.navigate(['/direcciones']);

      }


    });




    let carpooler = 1
    let respuesta;
    let emailLogin;

    emailLogin = this.datosLogin.email

    this.service.getCarpooling(carpooler, emailLogin).subscribe(data=>{
        respuesta = data;

        console.log(respuesta)

        this.carpooler = respuesta


          




    });


}


reservar(idUsuario2, emailCarpooler){

let respuesta3,respuesta2, respuesta

let emailLogin3 = this.datosLogin.email;
let claveLogin3 = this.datosLogin.clave;

var user: User



this.datosLogin.getlogin(emailLogin3, claveLogin3).subscribe(data => {
  respuesta3 = data;

  user = data[0];

// reserva
  let emailCliente = user.email;
  let reserva = 0;
  
  console.log("Datos de reserva: ", emailCliente, idUsuario2, reserva)
  
  
  
  // inscripcion
  let idUsuario3 = user.idUsuario
  let inscribir = 0;
  
  console.log("Datos de inscribir: ", emailCarpooler, idUsuario3, inscribir)


  this.service.postReserva(reserva, emailCliente, idUsuario2).subscribe(data=> {

    respuesta = data

    console.log(respuesta)

  })



  this.service.postInscripcion(inscribir,emailCarpooler, idUsuario3).subscribe(data=> {

    respuesta2 = data

    console.log(respuesta2)

  })



});







  



}



}
