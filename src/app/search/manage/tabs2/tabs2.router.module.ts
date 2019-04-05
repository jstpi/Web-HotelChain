import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabs2Page } from './tabs2.page';
import { HotelInfoPage } from '../hotel_info/hotel-info.page';
import { HotelRoomPage } from '../hotel_room/hotel-room.page';
import { HotelEmployeePage } from '../hotel_employee/hotel-employee.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: Tabs2Page,
    children: [
      {
        path: '',
        redirectTo: 'tabs/info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        //outlet: 'info',
        component: HotelInfoPage
      },
      {
        path: 'room',
        //outlet: 'room',
        component: HotelRoomPage
      },
      {
        path: 'employee',
        //outlet: 'employee',
        component: HotelEmployeePage
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/info',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Tabs2PageRoutingModule {}
