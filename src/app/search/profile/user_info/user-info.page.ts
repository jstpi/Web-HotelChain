import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Customer } from 'src/app/objects/customer.vm';
import { Address } from 'src/app/objects/address.vm';

@Component({
  selector: 'app-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  user: Customer;

  isEditMode: boolean;

  private editUserForm : FormGroup;
  isCountryChosen: Boolean;
  isStateProvChosen: Boolean;
  isCAN: Boolean;
  provinces: Array<String>;
  states: Array<String>;

  constructor(
    private formBuilder: FormBuilder, 
    public toastController: ToastController) {
    this.isEditMode = false;

    // TODO: change to a subscription

    let today = new Date();
    let address = new Address("Test address");
    this.user = new Customer("jstpi047", "23434654", "Jérémie St-Pierre", address, today.toISOString());

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
    this.addressInputControl();
  }

  editMode(){
    if (this.isEditMode){
      this.isEditMode = false;
    }
    else {
      this.isEditMode = true;
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
  }

  submit(){
    console.log(this.editUserForm.value);
    this.editUserToast();
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
