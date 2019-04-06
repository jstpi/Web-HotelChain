import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ManageInfoService } from 'src/app/services/manage-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/objects/room.vm';
import { HotelRoomsService } from 'src/app/services/hotel-rooms.service';
import { HotelBooksService } from 'src/app/services/hotel-books.service';
import { HotelRentsService } from 'src/app/services/hotel-rents.service';
import { ModalController } from '@ionic/angular';
import { AddRoomModal } from 'src/app/components/add-room_modal/add-room.modal';

@Component({
  selector: 'app-hotel-room',
  templateUrl: './hotel-room.page.html',
  styleUrls: ['./hotel-room.page.scss'],
})
export class HotelRoomPage implements OnInit {
  errorString: string;
  chain_name: string;
  hotel_id: string;
  rooms: Room[];
  sortedRooms: Room[];
  bookedRooms: Room[];
  rentedRooms: Room[];
  isRoomsMode: boolean;
  isRentedMode: boolean;
  isBookedMode: boolean;
  
  constructor(
    private authService: AuthService,
    private manageInfoService: ManageInfoService,
    private route: ActivatedRoute,
    private router: Router,
    private hotelRoomsService: HotelRoomsService,
    private hotelBooksService: HotelBooksService,
    private hotelRentsService: HotelRentsService,
    private modalCtrl: ModalController
  ) { 
    this.chain_name = "";
    this.hotel_id = "";
    this.errorString = "";
    this.rooms = [];
    this.sortedRooms = [];
    this.bookedRooms = [];
    this.rentedRooms = [];
    this.isRoomsMode = true;
    this.isBookedMode = false;
    this.isRentedMode = false;
  }

  ngOnInit() {
    this.errorString = "";
    this.rooms = [];
    if (this.authService.isLoggedIn() && (this.authService.getTokenRole() == "Admin" || this.authService.getTokenRole() == "Employee")){

      this.chain_name = this.manageInfoService.chain_name;
      if (this.manageInfoService.chain_name == ""){
        this.chain_name = this.route.snapshot.params['chain_name'];
      }
      this.hotel_id = this.manageInfoService.hotel_id;
      if (this.manageInfoService.hotel_id == ""){
        this.hotel_id = this.route.snapshot.params['hotel_id'];
      }
      if (this.chain_name == null){
        this.router.navigateByUrl("");
      }
      else {
        this.getAllRooms();
      }
    }
    else {
      this.router.navigateByUrl("");
    }
  }

  segmentChanged(event){
    if (event.value == "rooms"){

      this.getAllRooms();
    }
    else if (event.value == "booked"){
      this.getBookedRooms();
    }
    else if (event.value == "rented"){
      this.getRentedRooms();
    }
  }

  private getAllRooms(){
    this.errorString = "";
    this.rooms = [];
    let hotelInfo={
      hotel_id: this.manageInfoService.hotel_id
    }
    if (this.manageInfoService.hotel_id == ""){
      hotelInfo={
        hotel_id: this.route.snapshot.params['hotel_id']
      }
    }

    this.hotelRoomsService.getRooms(JSON.stringify(hotelInfo)).subscribe(rooms => {
      console.log(rooms);
      if (rooms != null){
        rooms.forEach(room => {
          this.rooms.push(new Room(room.room_number, room.hotel_id, room.chain_name, room.price, room.capacity, room.view_type, room.is_extendable, [""], [""]));
        }); 
        this.sortedRooms  = Object.assign([], this.rooms);
      }
      else {
        this.errorString = "No Rooms was founded";
      }
    }, err => {
      this.errorString = err;
    });
  }

  private getBookedRooms(){
    this.errorString = "";
    this.bookedRooms = [];
    let hotelInfo={
      hotel_id: this.manageInfoService.hotel_id
    }
    if (this.manageInfoService.hotel_id == ""){
      hotelInfo={
        hotel_id: this.route.snapshot.params['hotel_id']
      }
    }

    this.hotelBooksService.getBooks(JSON.stringify(hotelInfo)).subscribe(rooms => {
      console.log(rooms);
      if (rooms != null){
        rooms.forEach(room => {
          this.bookedRooms.push(new Room(room.room_number, room.hotel_id, room.chain_name, room.price, room.capacity, room.view_type, room.is_extendable, [""], [""]));
        }); 
      }
      else {
        this.errorString = "No Books was founded";
      }
    }, err => {
      this.errorString = err;
    });
  }

  private getRentedRooms(){
    this.errorString = "";
    this.rentedRooms = [];
    let hotelInfo={
      hotel_id: this.manageInfoService.hotel_id
    }
    if (this.manageInfoService.hotel_id == ""){
      hotelInfo={
        hotel_id: this.route.snapshot.params['hotel_id']
      }
    }

    this.hotelRentsService.getRents(JSON.stringify(hotelInfo)).subscribe(rooms => {
      console.log(rooms);
      if (rooms != null){
        rooms.forEach(room => {
          this.rentedRooms.push(new Room(room.room_number, room.hotel_id, room.chain_name, room.price, room.capacity, room.view_type, room.is_extendable, [""], [""]));
        }); 
      }
      else {
        this.errorString = "No Rent was founded";
      }
    }, err => {
      this.errorString = err;
    });
  }

  onFilterRooms(search){
    this.sortedRooms = this.filterRooms(search.detail.value);
  }

  async onAddRoom(){
    let modal = await this.modalCtrl.create({
      component: AddRoomModal,
      componentProps: {
        chain_name: this.chain_name,
        hotel_id: this.hotel_id
      }
    });
    return await modal.present();
  }

  async onEditRoom(i: number){
    let modal = await this.modalCtrl.create({
      component: AddRoomModal,
      componentProps: {
        room_number: this.sortedRooms[i].number
      }
    });
    return await modal.present();
  }

  private filterRooms(room_number: string): Room[] {
    return this.rooms.filter(room => {
      return room.number.toString().indexOf(room_number) > -1;
    });
  }

}
