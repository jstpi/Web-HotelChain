import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Customer } from 'src/app/objects/customer.vm';
import { Address } from 'src/app/objects/address.vm';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Employee } from 'src/app/objects/employee.vm';
import { Admin } from 'src/app/objects/admin.vm';
import { EditUserService } from 'src/app/services/edit-user.service';

@Component({
  selector: 'app-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  user: Customer;
  employee: Employee;
  admin: Admin;

  isUser: boolean;
  isEmployee: boolean;
  isAdmin: boolean;

  isEditMode: boolean;

  private editUserForm : FormGroup;
  isCountryChosen: Boolean;
  isStateProvChosen: Boolean;
  isCAN: Boolean;
  provinces: Array<String>;
  states: Array<String>;
  errorString: string;

  constructor(
    private formBuilder: FormBuilder, 
    public toastController: ToastController,
    private authService: AuthService,
    private router: Router,
    private userInfoService: UserInfoService,
    private editUserService: EditUserService) {
    this.isEditMode = false;
    this.errorString = "";

    // TODO: change to a subscription

    let today = new Date();
    let address = new Address("");
    this.user = new Customer("", "", "", address, today.toISOString());
    this.employee = new Employee("", "", "", address);
    this.admin = new Admin("", "", "");
    this.isUser = true;
    this.isEmployee = false;
    this.isAdmin = false;

    this.isCountryChosen = false;
    this.isStateProvChosen = false;
    this.isCAN = false;
    this.editUserForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      fullName: [this.user.full_name, Validators.required],
      sin: [this.user.sin, Validators.required],
      country: [""],
      state_province: [""],
      city: [""],
      street: [""],
      postalCode: [""],
    });
    this.provinces = [
      "Ontario", 
      "Quebec",
      "Nova Scotia",
      "New Brunswick",
      "Manitoba",
      "British Columbia",
      "Prince Edward Island",
      "Saskatchewan",
      "Alberta",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Yukon",
      "Nunavut"
    ]

    this.states = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming"
    ]
  }

  ngOnInit() {
    this.errorString = "";
    this.addressInputControl();

    this.isUser = this.authService.getTokenRole() == "Customer";
    this.isEmployee = this.authService.getTokenRole() == "Employee";
    this.isAdmin = this.authService.getTokenRole() == "Admin";

    if (this.authService.isLoggedIn()){  
      this.userInfoService.getUserInfo(JSON.stringify("")).subscribe(user => {
        console.log(user);
        if (user != null){
          if (this.authService.getTokenRole() == "Customer"){
            this.user = new Customer(user.email, user.sin, user.full_name, new Address(user.address), user.date_registration);
          }
          else if (this.authService.getTokenRole() == "Employee"){
            this.employee = new Employee(user.sin, user.email, user.full_name, new Address(user.address));
          }
          else {
            this.admin = new Admin(user.sin, user.full_name, user.email);
          }
        }
        else {
          this.errorString = "User was not founded";
        }
      }, err => {
        this.errorString = err;
      });
    }
    else {
      this.router.navigateByUrl("");
    }
  }

  editMode(){
    if (this.isEditMode){
      this.isEditMode = false;
    }
    else {
      this.isEditMode = true;
      if (this.isUser){
        this.editUserForm = this.formBuilder.group({
          email: [this.user.email, Validators.required],
          fullName: [this.user.full_name, Validators.required],
          sin: [this.user.sin, Validators.required],
          country: [""],
          state_province: [""],
          city: [""],
          street: [""],
          postalCode: [""],
        });
      }
      else if (this.isEmployee){
        this.editUserForm = this.formBuilder.group({
          email: [this.employee.email, Validators.required],
          fullName: [this.employee.full_name, Validators.required],
          sin: [this.employee.sin, Validators.required],
          country: [""],
          state_province: [""],
          city: [""],
          street: [""],
          postalCode: [""],
        });
      }
      else {
        this.editUserForm = this.formBuilder.group({
          email: [this.admin.email, Validators.required],
          fullName: [this.admin.full_name, Validators.required],
          sin: [this.admin.sin, Validators.required],
          country: [""],
          state_province: [""],
          city: [""],
          street: [""],
          postalCode: [""],
        });
      }
    }
  }

  submit(){
    if (this.isUser){
      this.editUserService.editUserInfo(JSON.stringify(this.editUserForm.value)).subscribe(user => {
        console.log(user);
        if (user != null){
          this.editUserToast();
        }
        else {
          this.errorString = "User was not founded";
        }
      }, err => {
        this.errorString = err;
      });
    }
    else if (this.isEmployee){
      this.editUserService.editEmployeeInfo(JSON.stringify(this.editUserForm.value)).subscribe(user => {
        console.log(user);
        if (user != null){
          this.editUserToast();
        }
        else {
          this.errorString = "User was not founded";
        }
      }, err => {
        this.errorString = err;
      });
    }
    else {
      this.editUserService.editAdminInfo(JSON.stringify(this.editUserForm.value)).subscribe(user => {
        console.log(user);
        if (user != null){
          this.editUserToast();
        }
        else {
          this.errorString = "User was not founded";
        }
      }, err => {
        this.errorString = err;
      });
    }
  }

  private async editUserToast() {
    const toast = await this.toastController.create({
      message: 'Your user data has been modified.',
      duration: 2000
    });
    return toast.present();
  }

  private addressInputControl(){
    let typeControl = this.editUserForm.get('country');
    typeControl.valueChanges.forEach(
      (value: string) => {
        this.editUserForm.get('state_province').setValue("");
        this.editUserForm.get('city').setValue("");
        this.editUserForm.get('street').setValue("");
        this.editUserForm.get('postalCode').setValue("");
        if (value == "CAN"){
          this.isCountryChosen = true;
          this.isCAN = true;
        }
        else if (value == "USA"){
          this.isCountryChosen = true;
          this.isCAN = false;
        }
        else {
          this.isCountryChosen = false;
        }
      }
    );
    let stateProvControl = this.editUserForm.get('state_province');
    stateProvControl.valueChanges.forEach(
      (value: string) => {
        this.editUserForm.get('city').setValue("");
        this.editUserForm.get('street').setValue("");
        this.editUserForm.get('postalCode').setValue("");
        if (value != ""){
          this.isStateProvChosen = true;
        }
        else {
          this.isStateProvChosen = false;
        }
      }
    );
  }

}
