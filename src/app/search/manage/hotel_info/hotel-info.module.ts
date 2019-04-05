import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { HotelInfoPage } from './hotel-info.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: HotelInfoPage, outlet: 'info' }]),
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [HotelInfoPage]
})
export class HotelInfoPageModule {}
