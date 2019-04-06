import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AddRoomService } from 'src/app/services/add-room.service';

@Component({
  selector: 'add-room-modal',
  templateUrl: './add-room.modal.html',
  styleUrls: ['./add-room.modal.scss'],
})
export class AddRoomModal implements OnInit {
  private roomForm : FormGroup;
  modalCtrl: ModalController;
  isExitByButton: Boolean;
  amenities: FormArray;
  hotel_id: string;
  chain_name: string;

  //log in feedback
  errorString: String;

  constructor(
    modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
    private addRoomService: AddRoomService, 
    private toastController: ToastController,
    private navParams: NavParams) {

    this.modalCtrl = modalCtrl;
    this.roomForm = this.formBuilder.group({
      price: [0, Validators.required],
      capacity: [0, Validators.required],
      view_type: ["", Validators.required],
      is_extendable: [true],
      amenities: this.formBuilder.array([this.createAmenities()])
    });
    this.isExitByButton = false;
    this.errorString = "";
  }

  addAmenity(): void{
    this.amenities = this.roomForm.get('amenities') as FormArray;
    this.amenities.push(this.createAmenities());
  }

  removeAmenity(i: number): void{
    this.amenities = this.roomForm.get('amenities') as FormArray;
    this.amenities.removeAt(i);
  }

  createAmenities(): FormGroup{
    return this.formBuilder.group({
      amenity: [''],
    });
  }

  ngOnInit() {
    this.hotel_id = this.navParams.get("hotel_id");
    this.chain_name = this.navParams.get("chain_name");
  }

  back(){
    this.isExitByButton = true;
    this.modalCtrl.dismiss({closeEvent: "back"});
  }

  submit(){
    this.errorString = "";
    let roomInfo = {
      chain_name: this.chain_name,
      hotel_id: this.hotel_id,
      price: this.roomForm.value.price,
      capacity: this.roomForm.value.capacity,
      view_type: this.roomForm.value.view_type,
      is_extendable: this.roomForm.value.is_extendable,
      amenities: this.roomForm.value.amenities,
    }
    console.log(roomInfo);

    this.addRoomService.addRoom(JSON.stringify(roomInfo)).subscribe(addRoomResponse => {
      console.log(addRoomResponse);
      if (addRoomResponse != null){
        this.addRoomToast();
        this.modalCtrl.dismiss({closeEvent: "addRoom"});
      }
    }, err => {
      this.errorString = err;
    });
  }

  private async addRoomToast() {
    const toast = await this.toastController.create({
      message: 'New room has been created',
      duration: 2000
    });
    return toast.present();
  }

}
