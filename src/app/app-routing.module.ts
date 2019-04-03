import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'profile', loadChildren: './search/profile/tabs/tabs.module#TabsPageModule' },
  { path: 'search/:city', loadChildren: './search/hotels/hotels.module#HotelsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
