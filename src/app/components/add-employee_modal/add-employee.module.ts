import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEmployeeModal } from './add-employee.modal';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AddEmployeeModal }])
  ],
  declarations: [AddEmployeeModal],
})
export class AddEmployeeModule {}
