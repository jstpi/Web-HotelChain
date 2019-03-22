import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainPopover } from './main.popover';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: MainPopover }])
  ],
  declarations: [MainPopover],
})
export class MainModule {}
