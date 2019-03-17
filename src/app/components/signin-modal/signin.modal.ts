import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'signin-modal',
  templateUrl: './signin.modal.html',
  styleUrls: ['./signin.modal.scss'],
})
export class SigninModal implements OnInit {
  private signinForm : FormGroup;
  modalCtrl: ModalController;
  isCountryChosen: Boolean;
  isStateProvChosen: Boolean;
  isCAN: Boolean;
  provinces: Array<String>;
  sates: Array<String>;

  constructor(modalCtrl: ModalController, private formBuilder: FormBuilder) {
    this.modalCtrl = modalCtrl;
    this.isCountryChosen = false;
    this.isStateProvChosen = false;
    this.isCAN = false;
    this.signinForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
      country: [''],
      state_province: [''],
      city: [''],
      street: [''],
      postalCode: [''],
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
    this.sates = [
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
    let typeControl = this.signinForm.get('country');
    typeControl.valueChanges.forEach(
      (value: string) => {
        this.signinForm.get('state_province').setValue("");
        this.signinForm.get('city').setValue("");
        this.signinForm.get('street').setValue("");
        this.signinForm.get('postalCode').setValue("");
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
    let stateProvControl = this.signinForm.get('state_province');
    stateProvControl.valueChanges.forEach(
      (value: string) => {
        this.signinForm.get('city').setValue("");
        this.signinForm.get('street').setValue("");
        this.signinForm.get('postalCode').setValue("");
        if (value != ""){
          this.isStateProvChosen = true;
        }
        else {
          this.isStateProvChosen = false;
        }
      }
    );
  }

  back(){
    this.modalCtrl.dismiss();
  }

  submit(){
    console.log(this.signinForm.value);
    this.modalCtrl.dismiss();
  }

}
