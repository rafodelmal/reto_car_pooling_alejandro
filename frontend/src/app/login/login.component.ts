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

  email: string;
  clave: string;
  usuarioReturn: any;

  constructor( private service: LoginService) { }

  ngOnInit(): void {
  }


  login(){

    let email1 = this.email;
    let clave1 = this.clave;

    console.log(email1);
    console.log(clave1);

    this.service.getlogin(email1, clave1).subscribe(data=>
      this.usuarioReturn=data);


  }


}
