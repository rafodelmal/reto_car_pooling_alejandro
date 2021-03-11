import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'app/login/login.component';
import { NosotrosComponent } from 'app/nosotros/nosotros.component';

@Component({
    selector: 'redirect',
    template:  ' <strong style="font-size: 40px; margin: 300px; color: #1976d2;"> Puedes seguir navegando, ¡el github abrirá en breve!...</strong>'
  })
  export class RedirectComponent implements OnInit {
    constructor() { }
  
    ngOnInit() {

        window.open('https://github.com/Alejo0508', '_blank');

    }

  }

export const AdminLayoutRoutes: Routes = [
    { path: 'carpool',      component: HomeComponent },
    { path: 'usuario',           component: UserComponent },
    { path: 'reservas',          component: TablesComponent },
   /* { path: 'tipografia',     component: TypographyComponent },
    { path: 'iconos',          component: IconsComponent },*/
    { path: 'mapas',           component: MapsComponent },
    { path: 'notificacion',  component: NotificationsComponent },
    { path: 'nosotros',  component: NosotrosComponent },
    { path: 'github', component: RedirectComponent },


   // { path: 'upgrade',        component: UpgradeComponent },
];
