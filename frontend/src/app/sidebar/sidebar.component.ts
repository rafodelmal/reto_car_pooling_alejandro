import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../login/user';
import { LoginService } from 'app/shared/services/login.service'

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}




export const ROUTES: RouteInfo[] = [
  { path: '/carpool', title: 'Carpool', icon: 'pe-7s-car', class: '' },
  { path: '/direcciones', title: 'Servicios', icon: 'pe-7s-id', class: '' },
  { path: '/reservas', title: 'Reservas', icon: 'pe-7s-note2', class: '' },
  { path: '/mapas', title: 'Mapas', icon: 'pe-7s-map-2', class: '' },
 // { path: '/github', title: 'Github', icon: 'pe-7s-share', class: '' },
 // { path: '/iconos', title: 'iconos', icon: 'pe-7s-map-2', class: '' },
  //{ path: '/calculadora', title: 'Calculadora', icon: 'pe-7s-share', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
   // { path: '/notificacion', title: 'Notificaciones',  icon:'pe-7s-bell', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  nombre: any;
  apellido: any;

  constructor(private datosLogin: LoginService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    let emailLogin, claveLogin

    emailLogin = this.datosLogin.email
    claveLogin = this.datosLogin.clave

    let respuesta;

    var user: User;

    this.datosLogin.getlogin(emailLogin, claveLogin).subscribe(data => {
      respuesta=data;

      user = data[0];

      this.nombre = user.nombre;
      this.apellido = user.apellido;

    })

  }


  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };


}
