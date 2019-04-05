import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { HotelEmployeePage } from './hotel-employee.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: HotelEmployeePage, outlet: 'info' }]),
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [HotelEmployeePage]
})
export class HotelEmployeePageModule {}
