import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin_modal/signin.modal';
import { MainPopover } from '../components/main_popover/main.popover';
import { Customer } from '../objects/customer.vm';
import { Employee } from '../objects/employee.vm';
import { NavService } from '../services/nav.service';

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
    public navService: NavService) { 
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
        this.submitLogIn();
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
        this.submitSignIn()
      }
    });
  }

  private submitLogIn(){
    // Logic to credential
    // Subscribe to data
    let today = new Date();
    let user = new Customer("jstpi047", "23434654", "Jérémie St-Pierre", "CAN", "Ontario", "Ottawa", "7, Main St.", "K0A 1M0", today.toISOString());
    this.navService.customer = user;
    this.isLogedIn = true;
  }

  private submitSignIn(){
    // Logic to credential
    let today = new Date();
    let user = new Customer("jstpi047", "23434654", "Jérémie St-Pierre", "CAN", "Ontario", "Ottawa", "7, Main St.", "K0A 1M0", today.toISOString());
    this.navService.customer = user;
    this.isLogedIn = true;
  }

}
