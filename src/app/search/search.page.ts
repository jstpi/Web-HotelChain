import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin-modal/signin.modal';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isLogedIn: Boolean;

  constructor(public modalCtrl: ModalController) { 
    this.isLogedIn = false;
  }

  ngOnInit() {}

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
        console.log("!!change UI!!")
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
