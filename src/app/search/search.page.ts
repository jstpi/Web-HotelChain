import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin_modal/signin.modal';
import { MainPopover } from '../components/main_popover/main.popover';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isLogedIn: Boolean;

  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController
    ) { 
    this.isLogedIn = false;
  }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MainPopover,
      event: ev,
      translucent: true
    });
    return await popover.present();
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
      if (data.data.closeEvent == "submit"){
        console.log("!!change UI!!")
      }
    });
  }

}
