import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginModal } from '../app/components/login_modal/login.modal';
import { SigninModal } from '../app/components/signin_modal/signin.modal';
import { MainPopover } from './components/main_popover/main.popover';
import { NavService } from './services/nav.service';
import { RequestOptions } from '@angular/http';
import { AuthRequestOptions } from './services/auth-request.service';
import { AuthErrorHandler } from './services/error-handler.service';

@NgModule({
  declarations: [AppComponent, LoginModal, SigninModal, MainPopover],
  entryComponents: [LoginModal, SigninModal, MainPopover],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RequestOptions, useClass: AuthRequestOptions},
    { provide: ErrorHandler, useClass: AuthErrorHandler },
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
