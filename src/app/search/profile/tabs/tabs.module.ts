import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { UserInfoPageModule } from '../user_info/user-info.module';
import { UserRoomPageModule } from '../user_room/user-room.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    UserInfoPageModule,
    UserRoomPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
