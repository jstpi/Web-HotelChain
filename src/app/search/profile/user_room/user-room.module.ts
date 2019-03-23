import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { UserRoomPage } from './user-room.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UserRoomPage, outlet: 'room' }])
  ],
  declarations: [UserRoomPage]
})
export class UserRoomPageModule {}
