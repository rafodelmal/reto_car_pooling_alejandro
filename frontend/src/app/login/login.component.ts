import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { from } from 'rxjs';
import {LoginService } from 'app/shared/services/login.service'
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { combineAll } from 'rxjs-compat/operator/combineAll';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  usuarioReturn: any;


  constructor( private service: LoginService) { }

  ngOnInit(): void {
  }


  login(){

    let usuario1 = this.usuario;
    let clave1 = this.clave;

    console.log(usuario1);
    console.log(clave1);

    this.service.getlogin(usuario1, clave1).subscribe(data=>
      this.usuarioReturn=data);


  }



}
