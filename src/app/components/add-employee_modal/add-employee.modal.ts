import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Address2 } from 'src/app/objects/address2.vm';
import { AddEmployeeService } from 'src/app/services/add-employee.service';

@Component({
  selector: 'add-employee-modal',
  templateUrl: './add-employee.modal.html',
  styleUrls: ['./add-employee.modal.scss'],
})
export class AddEmployeeModal implements OnInit {
  private signinForm : FormGroup;
  modalCtrl: ModalController;
  isCountryChosen: Boolean;
  isStateProvChosen: Boolean;
  isCAN: Boolean;
  provinces: Array<String>;
  sates: Array<String>;
  roles: FormArray;
  hotel_id: string;
  chain_name: string;

  //log in feedback
  errorString: String;

  constructor(modalCtrl: ModalController, private formBuilder: FormBuilder, private addEmployeeService: AddEmployeeService, private navParams: NavParams) {
    this.modalCtrl = modalCtrl;
    this.isCountryChosen = false;
    this.isStateProvChosen = false;
    this.isCAN = false;
    this.errorString = "";
    this.hotel_id = "";
    this.chain_name = "";
    this.signinForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
      fullName: ['', Validators.required],
      sin: ['', Validators.required],
      country: [''],
      state_province: [''],
      city: [''],
      street: [''],
      postalCode: [''],
      roles: this.formBuilder.array([this.createRole()])
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

  addRole(): void{
    this.roles = this.signinForm.get('roles') as FormArray;
    this.roles.push(this.createRole());
  }

  removeRole(i: number): void{
    this.roles = this.signinForm.get('roles') as FormArray;
    this.roles.removeAt(i);
  }

  createRole(): FormGroup{
    return this.formBuilder.group({
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.hotel_id = this.navParams.get("hotel_id");
    this.chain_name = this.navParams.get("chain_name");

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
    this.modalCtrl.dismiss({closeEvent: "back"});
  }

  submit(){
    this.errorString = "";
    let address = new Address2(this.signinForm.value.country, this.signinForm.value.state_province, this.signinForm.value.city, this.signinForm.value.street, this.signinForm.value.postalCode);
    let signinObj = {
      chain_name: this.chain_name,
      hotel_id: this.hotel_id,
      email: this.signinForm.value.user,
      password: this.signinForm.value.pass,
      full_name: this.signinForm.value.fullName,
      sin: this.signinForm.value.sin,
      roles: this.signinForm.value.roles,
      address: address.format()
    }

    this.addEmployeeService.addEmployee(JSON.stringify(signinObj)).subscribe(signInInfo => {
      console.log(signInInfo);
      if (signInInfo.valid){
        this.modalCtrl.dismiss({closeEvent: "submit"});
      }
      else {
        this.errorString = signInInfo.error;
      }
    }, err => this.errorString = err);
  }

}
