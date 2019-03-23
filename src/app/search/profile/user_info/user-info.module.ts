import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { UserInfoPage } from './user-info.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UserInfoPage, outlet: 'info' }])
  ],
  declarations: [UserInfoPage]
})
export class UserInfoPageModule {}
