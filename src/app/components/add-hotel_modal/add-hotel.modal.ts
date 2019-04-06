import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Address2 } from 'src/app/objects/address2.vm';
import { AddHotelService } from 'src/app/services/add-hotel.service';

@Component({
  selector: 'add-hotel-modal',
  templateUrl: './add-hotel.modal.html',
  styleUrls: ['./add-hotel.modal.scss'],
})
export class AddHotelModal implements OnInit {
  private hotelForm : FormGroup;
  modalCtrl: ModalController
  isExitByButton: Boolean;
  isCountryChosen: Boolean;
  isStateProvChosen: Boolean;
  isCAN: Boolean;
  provinces: Array<String>;
  sates: Array<String>;
  phone_numbers: FormArray;

  //log in feedback
  errorString: String;

  constructor(modalCtrl: ModalController, private formBuilder: FormBuilder, private addHotelService: AddHotelService, private toastController: ToastController, private navParam: NavParams) {
    this.isCountryChosen = false;
    this.isStateProvChosen = false;
    this.isCAN = false;
    this.modalCtrl = modalCtrl;
    this.hotelForm = this.formBuilder.group({
      contact_email_address: ['', Validators.required],
      rating: [0, Validators.required],
      country: ['', Validators.required],
      state_province: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone_numbers: this.formBuilder.array([this.createPhoneNumber()])
    });
    this.isExitByButton = false;
    this.errorString = "";

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

  addPhoneNumber(): void{
    this.phone_numbers = this.hotelForm.get('phone_numbers') as FormArray;
    this.phone_numbers.push(this.createPhoneNumber());
  }

  removePhoneNumber(i: number): void{
    this.phone_numbers = this.hotelForm.get('phone_numbers') as FormArray;
    this.phone_numbers.removeAt(i);
  }

  createPhoneNumber(): FormGroup{
    return this.formBuilder.group({
      phone_number: ['', Validators.required],
    });
  }

  ngOnInit() {
    let typeControl = this.hotelForm.get('country');
    typeControl.valueChanges.forEach(
      (value: string) => {
        this.hotelForm.get('state_province').setValue("");
        this.hotelForm.get('city').setValue("");
        this.hotelForm.get('street').setValue("");
        this.hotelForm.get('postalCode').setValue("");
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
    let stateProvControl = this.hotelForm.get('state_province');
    stateProvControl.valueChanges.forEach(
      (value: string) => {
        this.hotelForm.get('city').setValue("");
        this.hotelForm.get('street').setValue("");
        this.hotelForm.get('postalCode').setValue("");
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
    this.isExitByButton = true;
    this.modalCtrl.dismiss({closeEvent: "back"});
  }

  submit(){
    this.errorString = "";
    let address = new Address2(this.hotelForm.value.country, this.hotelForm.value.state_province, this.hotelForm.value.city, this.hotelForm.value.street, this.hotelForm.value.postalCode);
    let hotelObj = {
      chain_name: this.navParam.get("chain_name"),
      contact_email_address: this.hotelForm.value.contact_email_address,
      rating: this.hotelForm.value.rating,
      phone_numbers: this.hotelForm.value.phone_numbers,
      hotel_address: address.format()
    }
    this.addHotelService.addHotel(JSON.stringify(hotelObj)).subscribe(addHotelResponse => {
      console.log(addHotelResponse);
      if (addHotelResponse != null){
        this.addHotelToast();
        this.modalCtrl.dismiss({closeEvent: "addHotel"});
      }
    }, err => {
      this.errorString = err;
    });
  }

  private async addHotelToast() {
    const toast = await this.toastController.create({
      message: 'New hotel created',
      duration: 2000
    });
    return toast.present();
  }

}
