import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { User } from '../login/user';
import { ReservasService } from 'app/shared/services/reservas.service';
import { LoginService } from 'app/shared/services/login.service';

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

  constructor(private service: ReservasService, private datosLogin: LoginService) { }

  ngOnInit() {
     

    var user: User;
    let carpooler = 1
    let respuesta;
    let emailLogin;

    emailLogin = this.datosLogin.email

    this.service.gatCarpooling(carpooler, emailLogin).subscribe(data=>{
        respuesta = data;

        console.log(respuesta)

        this.carpooler = respuesta
    });

}

}
