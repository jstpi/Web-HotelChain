import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'main-popover',
  templateUrl: './main.popover.html',
  styleUrls: ['./main.popover.scss'],
})
export class MainPopover implements OnInit {

  constructor(private authService: AuthService, private popCtrl: PopoverController) {
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.popCtrl.dismiss({closeEvent: "logout"});
  }
  
}
