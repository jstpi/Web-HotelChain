import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { RoomsPage } from './rooms.page';
import { DatePickerModule } from 'ionic4-date-picker';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: RoomsPage }]),
    DatePickerModule
  ],
  declarations: [RoomsPage]
})
export class RoomsPageModule {}
