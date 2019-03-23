import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { UserInfoPage } from '../user_info/user-info.page';
import { UserRoomPage } from '../user_room/user-room.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'tabs/info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        //outlet: 'info',
        component: UserInfoPage
      },
      {
        path: 'room',
        //outlet: 'room',
        component: UserRoomPage
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
export class TabsPageRoutingModule {}
