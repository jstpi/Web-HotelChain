import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AddRentService } from 'src/app/services/add-rent.service';
import * as moment from 'moment';

@Component({
  selector: 'add-rent-modal',
  templateUrl: './add-rent.modal.html',
  styleUrls: ['./add-rent.modal.scss'],
})
export class AddRentModal implements OnInit {
  private rentForm : FormGroup;
  hotel_id: string;
  chain_name: string;
  room_number: number;
  isExitByButton: boolean;
  minTo: string;

  //log in feedback
  errorString: String;

  constructor(
    private modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
    private addRentService: AddRentService, 
    private toastController: ToastController,
    private navParams: NavParams) {

    this.rentForm = this.formBuilder.group({
      sin: ["", Validators.required],
      to: ["", Validators.required]
    });
    this.isExitByButton = false;
    this.errorString = "";
    this.minTo = moment(new Date()).format("YYYY-MM-DD");
  }

  ngOnInit() {
    this.hotel_id = this.navParams.get("hotel_id");
    this.chain_name = this.navParams.get("chain_name");
    this.room_number = this.navParams.get("room_number");
    this.rentForm = this.formBuilder.group({
      sin: ["", Validators.required],
      from: [this.minTo],
      to: [this.navParams.get("to"), Validators.required]
    });
  }

  back(){
    this.isExitByButton = true;
    this.modalCtrl.dismiss({closeEvent: "back"});
  }

  submit(){
    this.errorString = "";
    let rentInfo = {
      chain_name: this.chain_name,
      hotel_id: this.hotel_id,
      room_number: this.room_number,
      sin: this.rentForm.value.sin,
      check_out: this.rentForm.value.to
    }
    console.log(rentInfo);

    this.addRentService.addRent(JSON.stringify(rentInfo)).subscribe(addRentResponse => {
      console.log(addRentResponse);
      if (addRentResponse != null){
        this.addRentToast();
        this.modalCtrl.dismiss({closeEvent: "addRent"});
      }
      else {
        this.errorString = "The sin does not correspond to a customer"
      }
    }, err => {
      this.errorString = err;
    });
  }

  private async addRentToast() {
    const toast = await this.toastController.create({
      message: 'New rent for room #'+this.room_number+' has been made.',
      duration: 2000
    });
    return toast.present();
  }

}
