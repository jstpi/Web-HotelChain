import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { LoginModal } from '../components/login_modal/login.modal';
import { SigninModal } from '../components/signin_modal/signin.modal';
import { MainPopover } from '../components/main_popover/main.popover';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfoService } from '../services/user-info.service';
import { Customer } from '../objects/customer.vm';
import { Address } from '../objects/address.vm';
import { Employee } from '../objects/employee.vm';
import { Admin } from '../objects/admin.vm';
import { Hotel } from '../objects/hotel.vm';
import { Chain } from '../objects/chain.vm';
import { SearchHotelService } from '../services/search-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private searchForm : FormGroup;
  isLogedIn: Boolean;
  errorString: string;
  errorString2: string;
  userType: string;
  user: Customer;
  employee: Employee;
  admin: Admin;

  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private router: Router) {
      this.searchForm = this.formBuilder.group({
        address: ['', Validators.required]
      });
    this.isLogedIn = false;
    this.errorString = "";
    this.user = new Customer("", "", "", new Address(""), "");
    this.employee = new Employee("", "", "", new Address(""));
    this.admin = new Admin("", "", "");
    this.userType = "Customer";
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
          this.userType = "Customer";
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
        if (data.data.closeEvent == "submit"){
          this.getUser();
        }
      }
    });
  }

  onSearch(){
    this.router.navigate(['search', {city: this.searchForm.value.address}]);
  }

  // get the customer, employee or admin
  private getUser(){
    this.errorString = "";
    this.userType = this.authService.getTokenRole();
    let tokenSin = {
      sin: this.authService.getTokenId()
    }

    this.userInfoService.getUserInfo(JSON.stringify(tokenSin)).subscribe(userInfo => {
      if (userInfo.sin == null){
        this.isLogedIn = false;
        this.userType = "Customer";
      }
      else {
        if (this.userType == "Customer"){
          this.user = new Customer(userInfo.email, userInfo.sin, userInfo.full_name, new Address(userInfo.address), userInfo.date_registration);
        }
        else if (this.userType == "Employee"){
          this.employee = new Employee(userInfo.sin, userInfo.email, userInfo.full_name, new Address(userInfo.address));
        }
        else if (this.userType == "Admin"){
          this.admin = new Admin(userInfo.sin, userInfo.full_name, userInfo.email);
        }
        this.isLogedIn = true;
      }
    }, err => {
      this.errorString = err;
      this.isLogedIn = false;
    });
  }

}
