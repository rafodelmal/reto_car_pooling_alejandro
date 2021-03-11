import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}




export const ROUTES: RouteInfo[] = [
    { path: '/Carpool', title: 'Carpool',  icon: 'pe-7s-car', class: '' },
    { path: '/usuario', title: 'Usuario',  icon:'pe-7s-id', class: '' },
    { path: '/reservas', title: 'Tabla',  icon:'pe-7s-note2', class: '' },
    { path: '/mapas', title: 'Mapas',  icon:'pe-7s-map-2', class: '' },
    { path: '/notificacion', title: 'Notificaciones',  icon:'pe-7s-bell', class: '' },
    { path: '/github', title: 'github',  icon:'pe-7s-share', class: '' },   
   // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
