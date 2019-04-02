import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin_modal/signin.modal';
import { MainPopover } from '../components/main_popover/main.popover';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isLogedIn: Boolean;

  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    private authService: AuthService) { 
    this.isLogedIn = false;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.isLogedIn = true;
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MainPopover,
      event: ev,
      translucent: true
    });
    await popover.present();
    return await popover.onWillDismiss().then((data?)=>{
      if (data.data.closeEvent == "logout"){
        this.isLogedIn = false;
      }
    });
  }

  async onLogIn(){
    let modal = await this.modalCtrl.create({
      component: LoginModal,
    })
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data.closeEvent == "signin"){
        this.onSignIn();
      }
      else if (data.data.closeEvent == "submit"){
        this.isLogedIn = true;
      }
    });
  }

  async onSignIn(){
    let modal = await this.modalCtrl.create({
      component: SigninModal,
    });
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
    });
  }

}
