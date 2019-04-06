import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginModal } from '../app/components/login_modal/login.modal';
import { SigninModal } from '../app/components/signin_modal/signin.modal';
import { MainPopover } from './components/main_popover/main.popover';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor.service';
import { UserInfoService } from './services/user-info.service';
import { SearchHotelService } from './services/search-hotel.service';
import { SearchRoomsService } from './services/search-rooms.service';
import { AddHotelModal } from './components/add-hotel_modal/add-hotel.modal';
import { BookRoomService } from './services/book-room.service';
import { AdminHotelsService } from './services/admin-hotels.service';
import { AddHotelService } from './services/add-hotel.service';
import { HotelInfoService } from './services/hotel-info.service';
import { ManageInfoService } from './services/manage-info.service';
import { EditUserService } from './services/edit-user.service';
import { DeleteHotelService } from './services/delete-hotel.service';
import { EditHotelService } from './services/edit-hotel.service';
import { HotelRoomsService } from './services/hotel-rooms.service';
import { HotelBooksService } from './services/hotel-books.service';
import { HotelRentsService } from './services/hotel-rents.service';
import { AddRoomService } from './services/add-room.service';
import { AddRoomModal } from './components/add-room_modal/add-room.modal';
import { EditRoomModal } from './components/edit-room_modal/edit-room.modal';
import { EditRoomService } from './services/edit-room.service';
import { HotelEmployeeService } from './services/hotel-employees.service';
import { AddEmployeeService } from './services/add-employee.service';
import { AddEmployeeModal } from './components/add-employee_modal/add-employee.modal';
import { DeleteEmployeeService } from './services/delete-employee.service';

@NgModule({
  declarations: [AppComponent, LoginModal, SigninModal, MainPopover, AddHotelModal, AddRoomModal, EditRoomModal, AddEmployeeModal],
  entryComponents: [LoginModal, SigninModal, MainPopover, AddHotelModal, AddRoomModal, EditRoomModal, AddEmployeeModal],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    UserInfoService,
    SearchHotelService,
    SearchRoomsService,
    BookRoomService,
    AdminHotelsService,
    AddHotelService,
    HotelInfoService,
    ManageInfoService,
    EditUserService,
    DeleteHotelService,
    EditHotelService,
    HotelRoomsService,
    HotelBooksService,
    HotelRentsService,
    AddRoomService,
    EditRoomService,
    HotelEmployeeService,
    AddEmployeeService,
    DeleteEmployeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
