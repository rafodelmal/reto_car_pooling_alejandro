import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { UserComponent } from './user/user.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { BrowserModule } from '@angular/platform-browser'
import { AuthGuard } from './shared/guards/auth.guard';
import { RegistrarComponent } from './registrar/registrar.component';
import { NgxWhastappButtonModule } from "ngx-whatsapp-button";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    NgxWhastappButtonModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    NosotrosComponent,
    CalculadoraComponent,
   // DireccionesComponent,
    RegistrarComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
 
})
export class AppModule { }



