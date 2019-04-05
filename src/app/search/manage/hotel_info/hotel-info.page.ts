import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Customer } from 'src/app/objects/customer.vm';
import { Address } from 'src/app/objects/address.vm';
import { Hotel } from 'src/app/objects/hotel.vm';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.page.html',
  styleUrls: ['./hotel-info.page.scss'],
})
export class HotelInfoPage implements OnInit {
  hotel: Hotel;

  isEditMode: boolean;

  private editHotelForm : FormGroup;
  isCountryChosen: Boolean;
  isStateProvChosen: Boolean;
  isCAN: Boolean;
  provinces: Array<String>;
  states: Array<String>;
  phone_numbers: FormArray;

  constructor(
    private formBuilder: FormBuilder, 
    public toastController: ToastController) {
    this.isEditMode = false;

    // TODO: change to a subscription
    this.hotel = new Hotel("test", "id", 2, 23, new Address("7, rue Fleurette"), "test@mail.com", ["623-435-3456", "334-234-2344"], 0, [2, 3]);


    this.isCountryChosen = false;
    this.isStateProvChosen = false;
    this.isCAN = false;
    this.editHotelForm = this.formBuilder.group({
      hotel_id: [this.hotel.hotel_id, Validators.required],
      number_of_rooms: [this.hotel.number_of_rooms, Validators.required],
      rating: [this.hotel.rating, Validators.required],
      contact_email_address: [this.hotel.contact_email_address, Validators.required],
      phone_numbers: this.formBuilder.array([]),
      country: [""],
      state_province: [""],
      city: [""],
      street: [""],
      postalCode: [""],
    });
    this.hotel.contact_phone_numbers.forEach(phoneNum => {
      this.addPhoneNumber(phoneNum);
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

  addPhoneNumber(phoneNum?): void{
    this.phone_numbers = this.editHotelForm.get('phone_numbers') as FormArray;
    if (phoneNum != null){
      this.phone_numbers.push(this.createPhoneNumber(phoneNum));
    }
    else {
      this.phone_numbers.push(this.createPhoneNumber());
    }
  }

  removePhoneNumber(i: number): void{
    this.phone_numbers = this.editHotelForm.get('phone_numbers') as FormArray;
    this.phone_numbers.removeAt(i);
  }

  createPhoneNumber(phoneNum?): FormGroup{
    if (phoneNum != null){
      return this.formBuilder.group({
        phone_number: [phoneNum, Validators.required],
      });
    }
    else {
      return this.formBuilder.group({
        phone_number: ['', Validators.required],
      });
    }
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
      this.editHotelForm = this.formBuilder.group({
        hotel_id: [this.hotel.hotel_id, Validators.required],
        number_of_rooms: [this.hotel.number_of_rooms, Validators.required],
        rating: [this.hotel.rating, Validators.required],
        contact_email_address: [this.hotel.contact_email_address, Validators.required],
        phone_numbers: this.formBuilder.array([]),
        country: [""],
        state_province: [""],
        city: [""],
        street: [""],
        postalCode: [""],
      });
      this.hotel.contact_phone_numbers.forEach(phoneNum => {
        this.addPhoneNumber(phoneNum);
      });
    }
  }

  submit(){
    console.log(this.editHotelForm.value);
    this.editUserToast();
  }

  private async editUserToast() {
    const toast = await this.toastController.create({
      message: 'Your hotel data has been modified.',
      duration: 2000
    });
    return toast.present();
  }

  private addressInputControl(){
    let typeControl = this.editHotelForm.get('country');
    typeControl.valueChanges.forEach(
      (value: string) => {
        this.editHotelForm.get('state_province').setValue("");
        this.editHotelForm.get('city').setValue("");
        this.editHotelForm.get('street').setValue("");
        this.editHotelForm.get('postalCode').setValue("");
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
    let stateProvControl = this.editHotelForm.get('state_province');
    stateProvControl.valueChanges.forEach(
      (value: string) => {
        this.editHotelForm.get('city').setValue("");
        this.editHotelForm.get('street').setValue("");
        this.editHotelForm.get('postalCode').setValue("");
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
