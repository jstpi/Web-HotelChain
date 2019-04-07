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
import { EditRoomModal } from 'src/app/components/edit-room_modal/edit-room.modal';
import { AddRentModal } from 'src/app/components/add-rent_modal/add-rent.modal';

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
  flag: boolean;
  
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
    this.flag = true;
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
        this.getBookedRooms();
        this.getRentedRooms();
        this.getAllRooms();
      }
    }
    else {
      this.router.navigateByUrl("");
    }
  }

  segmentChanged(event){
    if (this.flag){
      this.flag = false;
    }
    else {
      if (event.detail.value == "rooms"){
        this.isRoomsMode = true;
        this.isRentedMode = false;
        this.isBookedMode = false;
        this.getAllRooms();
      }
      else if (event.detail.value == "booked"){
        this.isRoomsMode = false;
        this.isRentedMode = false;
        this.isBookedMode = true;
        this.getBookedRooms();
      }
      else if (event.detail.value == "rented"){
        this.isRoomsMode = false;
        this.isRentedMode = true;
        this.isBookedMode = false;
        this.getRentedRooms();
      }
    }
  }

  private getAllRooms(){
    this.errorString = "";
    this.rooms = [];
    this.sortedRooms = [];
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
        this.rentedRooms.forEach(rentedRoom => {
          this.rooms.forEach(room => {
            if (rentedRoom.number == room.number){
              room.isRented = true;
            }
          });
        });
        this.bookedRooms.forEach(bookedRoom => {
          this.rooms.forEach(room => {
            if (bookedRoom.number == room.number){
              room.isBooked = true;
            }
          });
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
          let newRoom = new Room(room.room_number, room.hotel_id, room.chain_name, room.price, room.capacity, room.view_type, room.is_extendable, [""], [""]);
          newRoom.check_in = room.check_in;
          newRoom.check_out = room.check_out;
          this.bookedRooms.push(newRoom);

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
          let newRoom = new Room(room.room_number, room.hotel_id, room.chain_name, room.price, room.capacity, room.view_type, room.is_extendable, [""], [""]);
          newRoom.check_in = room.check_in;
          newRoom.check_out = room.check_out;
          this.rentedRooms.push(newRoom);
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
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "addRoom"){
          this.getAllRooms();
        }
      }
    });
  }

  async onEditRoom(i: number){
    let modal = await this.modalCtrl.create({
      component: EditRoomModal,
      componentProps: {
        chain_name: this.chain_name,
        hotel_id: this.hotel_id,
        room_number: this.sortedRooms[i].number,
        price: this.sortedRooms[i].price,
        capacity: this.sortedRooms[i].capacity,
        view_type: this.sortedRooms[i].view_type,
        is_extendable: this.sortedRooms[i].is_extendable,
        amenities: this.sortedRooms[i].amenities
      }
    });
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "editRoom"){
          this.getAllRooms();
        }
      }
    });
  }

  async onRentRoom(i: number){
    if (this.isRoomsMode){
      if (this.sortedRooms[i].isBooked){
        this.bookedRooms.forEach(bookedRoom => {
          if (bookedRoom.number == this.sortedRooms[i].number){
            this.sortedRooms[i].check_out = bookedRoom.check_out;
          }
        });
      }
      let modal = await this.modalCtrl.create({
        component: AddRentModal,
        componentProps: {
          chain_name: this.chain_name,
          hotel_id: this.hotel_id,
          room_number: this.sortedRooms[i].number,
          to: this.sortedRooms[i].check_out,
        }
      });
      await modal.present();
      return await modal.onWillDismiss().then((data?)=>{
        if (data.data !== undefined){
          if (data.data.closeEvent == "addRent"){
            this.getRentedRooms();
            this.getBookedRooms();
            this.getAllRooms();
          }
        }
      });
    }
    else if (this.isBookedMode){
      let modal = await this.modalCtrl.create({
        component: AddRentModal,
        componentProps: {
          chain_name: this.chain_name,
          hotel_id: this.hotel_id,
          room_number: this.sortedRooms[i].number,
          to: this.rentedRooms[i].check_out,
        }
      });
      await modal.present();
      return await modal.onWillDismiss().then((data?)=>{
        if (data.data !== undefined){
          if (data.data.closeEvent == "addRent"){
            this.getRentedRooms();
            this.getBookedRooms();
            this.getAllRooms();
          }
        }
      });
    }
    
  }

  private filterRooms(room_number: string): Room[] {
    return this.rooms.filter(room => {
      return room.number.toString().indexOf(room_number) > -1;
    });
  }

}
