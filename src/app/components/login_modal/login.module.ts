import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { TabsPageRoutingModule } from './tabs.router.module';

import { LoginModal } from './login.modal';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: LoginModal }])
  ],
  declarations: [LoginModal]
})
export class LoginModule {}
