import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin-modal/signin.modal'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  async onLogIn(){
    let modal = await this.modalCtrl.create({
      component: LoginModal
    })
    return await modal.present();
  }

  async onSignIn(){
    let modal = await this.modalCtrl.create({
      component: SigninModal
    })
    return await modal.present();
  }

}
