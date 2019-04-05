import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tabs2PageRoutingModule } from './tabs2.router.module';

import { Tabs2Page } from './tabs2.page';
import { HotelInfoPageModule } from '../hotel_info/hotel-info.module';
import { HotelRoomPageModule } from '../hotel_room/hotel-room.module';
import { HotelEmployeePageModule } from '../hotel_employee/hotel-employee.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tabs2PageRoutingModule,
    HotelInfoPageModule,
    HotelRoomPageModule,
    HotelEmployeePageModule
  ],
  declarations: [Tabs2Page]
})
export class Tabs2PageModule {}
