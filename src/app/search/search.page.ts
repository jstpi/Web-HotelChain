import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController, AlertController, ToastController } from '@ionic/angular';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddHotelModal } from '../components/add-hotel_modal/add-hotel.modal';
import { AdminHotelsService } from '../services/admin-hotels.service';
import { ManageInfoService } from '../services/manage-info.service';
import { DeleteHotelService } from '../services/delete-hotel.service';
import { EmployeeHotelsService } from '../services/employee-hotels.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private searchForm : FormGroup;
  isLogedIn: Boolean;
  errorString: string;
  userType: string;
  user: Customer;
  employee: Employee;
  admin: Admin;
  chain_name: string;
  hotels: Hotel[];

  constructor(
    public modalCtrl: ModalController,
    public popoverController: PopoverController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private alertController: AlertController,
    private adminHotelsService: AdminHotelsService,
    private router: Router,
    private manageInfoService: ManageInfoService,
    private deleteHotelService: DeleteHotelService,
    private toastController: ToastController,
    private employeeHotelsService: EmployeeHotelsService) {
      this.searchForm = this.formBuilder.group({
        address: ['', Validators.required]
      });
    this.isLogedIn = false;
    this.errorString = "";
    this.user = new Customer("", "", "", new Address(""), "");
    this.employee = new Employee("", "", "", new Address(""), []);
    this.admin = new Admin("", "", "");
    this.chain_name = "";
    this.hotels = [];
    this.userType = "Customer";
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()){
      this.getUser();
    }
    else {
      this.userType = "Customer";
      this.isLogedIn = false;
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

  async onAddHotel(){
    let modal = await this.modalCtrl.create({
      component: AddHotelModal,
      componentProps: {
        chain_name: this.chain_name
      }
    });
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "addHotel"){
          this.getUser();
        }
      }
    });
  }

  onDeleteHotel(i: number){
    let hotelObj = {
      hotel_id: this.hotels[i].hotel_id
    }
    this.deleteHotelService.deleteHotel(JSON.stringify(hotelObj)).subscribe(deleteResponse => {
      console.log(deleteResponse);
      if (deleteResponse != null){
        this.deleteHotelToast(i);
        this.getUser();
      }
      else {
        this.errorString = "Error occured during deletion"
      }
    }, err => {
      this.errorString = err;
    });
  }

  async onRemoveHotelConfirm(i: number) {
    const alert = await this.alertController.create({
      header: 'Delete: '+this.hotels[i].hotel_id,
      message: 'The deletion of this hotel will remove all rooms associated',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('CANCEL');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.onDeleteHotel(i);
          }
        }
      ]
    });

    await alert.present();
  }

  onSearch(){
    this.router.navigate(['search', {city: this.searchForm.value.address}]);
  }

  onManage(i: number){
    this.router.navigate(['manage/tabs/info', {
      chain_name: this.chain_name,
      hotel_id: this.hotels[i].hotel_id
    }]);
    this.manageInfoService.chain_name = this.chain_name;
    this.manageInfoService.hotel_id = this.hotels[i].hotel_id;
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
          this.employee = new Employee(userInfo.sin, userInfo.email, userInfo.full_name, new Address(userInfo.address), []);
          this.hotels = [];
          this.employeeHotelsService.getEmployeeHotels(JSON.stringify(tokenSin)).subscribe(hotel => {
            console.log(hotel);
            if (hotel != null){
              this.hotels.push(new Hotel(hotel.chain_name, hotel.hotel_id, hotel.rating, hotel.number_of_rooms, new Address(hotel.hotel_address), hotel.contact_email_address, [""], hotel.minPrice, hotel.capacities));
              this.chain_name = hotel.chain_name;
            }
            else {
              this.hotels = [];
            }
          }, err => {
            this.errorString = err;
          });
        }
        else if (this.userType == "Admin"){
          this.hotels = [];
          this.admin = new Admin(userInfo.sin, userInfo.full_name, userInfo.email);
          this.adminHotelsService.getAdminHotels(JSON.stringify(tokenSin)).subscribe(hotels => {
            console.log(hotels);
            if (hotels != null){
              hotels.forEach(hotel => {
                this.hotels.push(new Hotel(hotel.chain_name, hotel.hotel_id, hotel.rating, hotel.number_of_rooms, new Address(hotel.hotel_address), hotel.contact_email_address, [""], hotel.minPrice, hotel.capacities));
                this.chain_name = hotel.chain_name;
              }); 
            }
            else {
              this.hotels = [];
            }
          }, err => {
            this.errorString = err;
          });
        }
        this.isLogedIn = true;
      }
    }, err => {
      this.errorString = err;
      this.isLogedIn = false;
    });
  }

  private async deleteHotelToast(i: number) {
    const toast = await this.toastController.create({
      message: 'Hotel: '+this.hotels[i].hotel_id+' deleted.',
      duration: 2000
    });
    return toast.present();
  }

}
