import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'profile', loadChildren: './search/profile/tabs/tabs.module#TabsPageModule' },
  { path: 'search', loadChildren: './search/hotels/hotels.module#HotelsPageModule' },
  { path: 'search/room', loadChildren: './search/hotels/rooms/rooms.module#RoomsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
