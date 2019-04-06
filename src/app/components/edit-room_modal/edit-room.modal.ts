import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AddRoomService } from 'src/app/services/add-room.service';
import { EditRoomService } from 'src/app/services/edit-room.service';

@Component({
  selector: 'edit-room-modal',
  templateUrl: './edit-room.modal.html',
  styleUrls: ['./edit-room.modal.scss'],
})
export class EditRoomModal implements OnInit {
  private roomForm : FormGroup;
  modalCtrl: ModalController;
  isExitByButton: Boolean;
  amenities: FormArray;
  hotel_id: string;
  chain_name: string;
  room_number: number;

  //log in feedback
  errorString: String;

  constructor(
    modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
    private editRoomService: EditRoomService, 
    private toastController: ToastController,
    private navParams: NavParams) {

    this.modalCtrl = modalCtrl;
    this.roomForm = this.formBuilder.group({
      price: [0],
      capacity: [0],
      view_type: [""],
      is_extendable: [true],
      amenities: this.formBuilder.array([this.createAmenities()])
    });
    this.isExitByButton = false;
    this.errorString = "";
    this.room_number = 0;
  }

  addAmenity(amenity?): void{
    this.amenities = this.roomForm.get('amenities') as FormArray;
    if (amenity != null){
      this.amenities.push(this.createAmenities(amenity));
    }
    else {
      this.amenities.push(this.createAmenities());
    }
  }

  removeAmenity(i: number): void{
    this.amenities = this.roomForm.get('amenities') as FormArray;
    this.amenities.removeAt(i);
  }

  createAmenities(amenity?): FormGroup{
    if (amenity != null){
      return this.formBuilder.group({
        amenity: [amenity],
      });
    }
    else {
      return this.formBuilder.group({
        amenity: [''],
      });
    }
  }

  ngOnInit() {
    this.hotel_id = this.navParams.get("hotel_id");
    this.chain_name = this.navParams.get("chain_name");
    this.room_number = this.navParams.get("room_number");
    let price = this.navParams.get("price");
    let capacity = this.navParams.get("capacity");
    let view_type = this.navParams.get("view_type");
    let is_extendable = this.navParams.get("is_extendable");
    let amenities = this.navParams.get("amenities");

    this.roomForm = this.formBuilder.group({
      price: [price],
      capacity: [capacity],
      view_type: [view_type],
      is_extendable: [is_extendable],
      amenities: this.formBuilder.array([])
    });

    amenities.forEach(amenity => {
      this.addAmenity(amenity);
    });
  }

  back(){
    this.isExitByButton = true;
    this.modalCtrl.dismiss({closeEvent: "back"});
  }

  submit(){
    this.errorString = "";
    let roomInfo = {
      room_number: this.room_number,
      chain_name: this.chain_name,
      hotel_id: this.hotel_id,
      price: this.roomForm.value.price,
      capacity: this.roomForm.value.capacity,
      view_type: this.roomForm.value.view_type,
      is_extendable: this.roomForm.value.is_extendable,
      amenities: this.roomForm.value.amenities,
    }
    console.log(roomInfo);

    this.editRoomService.editRoom(JSON.stringify(roomInfo)).subscribe(addRoomResponse => {
      console.log(addRoomResponse);
      if (addRoomResponse != null){
        this.editRoomToast();
        this.modalCtrl.dismiss({closeEvent: "editRoom"});
      }
    }, err => {
      this.errorString = err;
    });
  }

  onDelete(){
    let roomInfo = {
      hotel_id: this.hotel_id,
      room_number: this.room_number
    }
    this.editRoomService.deleteRoom(JSON.stringify(roomInfo)).subscribe(addRoomResponse => {
      console.log(addRoomResponse);
      if (addRoomResponse != null){
        this.deleteRoomToast();
        this.modalCtrl.dismiss({closeEvent: "editRoom"});
      }
    }, err => {
      this.errorString = err;
    });
  }

  private async editRoomToast() {
    const toast = await this.toastController.create({
      message: 'Room #'+this.room_number+' has been modified',
      duration: 2000
    });
    return toast.present();
  }

  private async deleteRoomToast() {
    const toast = await this.toastController.create({
      message: 'Room #'+this.room_number+' has been deleted',
      duration: 2000
    });
    return toast.present();
  }

}
