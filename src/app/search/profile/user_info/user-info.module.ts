import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { UserInfoPage } from './user-info.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: UserInfoPage, outlet: 'info' }]),
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [UserInfoPage]
})
export class UserInfoPageModule {}
