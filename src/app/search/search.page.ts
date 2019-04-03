import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin_modal/signin.modal';
import { MainPopover } from '../components/main_popover/main.popover';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfoService } from '../services/user-info.service';
import { Customer } from '../objects/customer.vm';
import { Address } from '../objects/address.vm';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  isLogedIn: Boolean;
  errorString: String;
  user: Customer;

  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    private authService: AuthService,
    private userInfoService: UserInfoService) { 
    this.isLogedIn = false;
    this.errorString = "";
    this.user = new Customer("", "", "", new Address("", "", "", "", ""), "");
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.getUser();
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
      if (data.data !== undefined){
        if (data.data.closeEvent == "logout"){
          this.isLogedIn = false;
        }
      }
    });
  }

  async onLogIn(){
    let modal = await this.modalCtrl.create({
      component: LoginModal,
    })
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "signin"){
          this.onSignIn();
        }
        else if (data.data.closeEvent == "submit"){
          this.getUser();
        }
      }
    });
  }

  async onSignIn(){
    let modal = await this.modalCtrl.create({
      component: SigninModal,
    });
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){

      }
    });
  }

  private getUser(){
    this.errorString = "";
    let tokenSin = {
      sin: this.authService.getTokenId()
    }
    this.userInfoService.getUserInfo(JSON.stringify(tokenSin)).subscribe(userInfo => {
      if (userInfo.sin == null){
        this.isLogedIn = false;
      }
      else {
        this.user = new Customer(userInfo.email, userInfo.sin, userInfo.full_name, new Address("", "", "", "", ""), userInfo.date_registration);
        this.isLogedIn = true;
      }
    }, err => {
      this.errorString = err;
      this.isLogedIn = false;
    });
  }

}
