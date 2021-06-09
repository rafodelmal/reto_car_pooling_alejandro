import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { User } from 'app/login/user';
import { LoginComponent } from 'app/login/login.component';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private datoslogin: LoginService){

 //   this.grabarLocalStorage();


  }

 /* grabarLocalStorage(){

    let datosSesion = this.datoslogin.respuestaLogin;

    console.log("grabarLocalStorage",datosSesion)

    localStorage.setItem("datosSesion", JSON.stringify(datosSesion));
  } */


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let datosGuard = this.datoslogin.respuestaLogin

  
    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

    console.log("recuperarStorage", recuperarStorage)

    if(recuperarStorage.email){
      console.log("FFFFFF")
     
     return true;
    }else {
      console.log("¡FUNCIONA!!!!!")
      this.router.navigate(['/login']);
      return false;
       
    }

   /* if (!datosGuard){
      this.router.navigate(['/login']);
      return false;
    }
        return true; */

  } 




  
  
}
