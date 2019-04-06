import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'main-popover',
  templateUrl: './main.popover.html',
  styleUrls: ['./main.popover.scss'],
})
export class MainPopover implements OnInit {
  isCustomer: boolean;

  constructor(
    private authService: AuthService, 
    private popCtrl: PopoverController,
    private router: Router,
    private modalCtrl: ModalController,
    private popupCtrl: PopoverController) {
  }

  ngOnInit() {
    this.isCustomer = this.authService.getTokenRole() == "Customer";
  }

  profile(){
    this.router.navigate(['profile/tabs/info']);
    this.popupCtrl.dismiss();
  }

  book(){
    this.router.navigate(['profile/tabs/room']);
    this.popupCtrl.dismiss();
  }

  logout(){
    this.authService.logout();
    this.popCtrl.dismiss({closeEvent: "logout"});
  }
  
}
