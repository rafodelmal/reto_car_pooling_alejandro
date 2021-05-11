import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { map } from 'rxjs/operators';
import { LoginComponent } from 'app/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router, private datoslogin: LoginComponent){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let datosGuard = this.datoslogin.datosGuard

    if (!datosGuard){
      return false;
    }

        return true;


    
  } 
  
}
