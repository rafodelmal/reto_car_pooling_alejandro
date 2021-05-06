import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CanActiveGuard } from './can-active.guard';

const routes: Routes =[
/*  {
    path: '',
    redirectTo: 'carpool',
    pathMatch: 'full',
  },  */
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent, canActivate: [CanActiveGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    component: LoginComponent
  },
];

@NgModule({

  

  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
