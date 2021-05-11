import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData: any

  

  constructor( ) { 




  }
  

  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentAcceder = '';

  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  login(){
    localStorage.setItem(this.ISLOGGEDKEY, 'true');
    this.changeLoginStatusSubject.next(true);
  }

  logout(){
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false)
  }

  isLoggedIn(url: string){
    const isLogged = localStorage.getItem(this.ISLOGGEDKEY);
    if (!isLogged){
      this.urlUsuarioIntentAcceder = url;
      return false;
    }
    return true;
  }
 
}
