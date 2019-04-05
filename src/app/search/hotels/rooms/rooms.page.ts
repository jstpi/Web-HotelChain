import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchRoomsService } from 'src/app/services/search-rooms.service';
import { Room } from 'src/app/objects/room.vm';
import * as moment from 'moment';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LoginModal } from 'src/app/components/login_modal/login.modal';
import { SigninModal } from 'src/app/components/signin_modal/signin.modal';
import { AuthService } from 'src/app/services/auth.service';
import { BookRoomService } from 'src/app/services/book-room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  private filterForm : FormGroup;
  errorString: string;
  rooms: Room[];
  sortedRooms: Room[];
  hotelId: string;
  chain_name: string;
  isRefreshed: boolean;
  minFrom: string;
  minTo: string;

  constructor(
    public modalCtrl: ModalController,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private searchRoomsService: SearchRoomsService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private bookRoomService: BookRoomService,
    public toastController: ToastController) {
      this.errorString = "";
      this.rooms = [];
      this.sortedRooms = [];
      this.filterForm = this.formBuilder.group({
        from: ['', Validators.required],
        to: ['', Validators.required],
        price: [80],
        capacity: ["0"]
      });
      this.hotelId = "";
      this.chain_name = "";
      this.isRefreshed = false;
      this.minFrom = moment(new Date()).format("YYYY-MM-DD");
      console.log(this.minFrom);
  }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params['hotelId'];
    this.chain_name = this.route.snapshot.params['chain_name'];
    this.filterForm.patchValue({
      price: this.route.snapshot.params['price'],
      capacity: this.route.snapshot.params['capacity']
    });

    this.filterForm.controls['from'].valueChanges.subscribe(value => {
      this.minTo = value;
    });
  }

  refresh(){
    this.errorString = "";
    this.rooms = [];
    this.isRefreshed = true;
    let roomsInfo={
      hotel_id: this.route.snapshot.params['hotelId'],
      chain_name: this.route.snapshot.params['chain_name'],
      check_in: this.filterForm.value.from,
      check_out: this.filterForm.value.to
    }
    this.searchRoomsService.getRooms(JSON.stringify(roomsInfo)).subscribe(rooms => {
      console.log(rooms);
      if (rooms != null){
        rooms.forEach(room => {
          // TO CHANGE
          this.rooms.push(new Room(room.room_number, room.hotel_id, room.chain_name, room.price, room.capacity, room.view_type, room.is_extendable, [""], [""]));
        }); 
        this.sortedRooms  = Object.assign([], this.rooms);
      }
      else {
        this.errorString = "No rooms was founded";
      }
    }, err => {
      this.errorString = err;
    });

    this.onFilter();
  }

  onFilter(){
    let capacity = parseInt(this.filterForm.value.capacity);
    this.sortedRooms = this.filterRooms(capacity, this.filterForm.value.price);
  }

  onBook(i: number){
    if (this.authService.isLoggedIn()){
      this.onBookRoomConfirm(i);
    }
    else {
      this.onLogIn(i);
    }
  }

  async onBookRoomConfirm(i: number) {
    const alert = await this.alertController.create({
      header: this.chain_name+' (room #'+this.sortedRooms[i].number+')',
      message: '<p>check in: '+this.filterForm.value.from+'</p><p>check out: '+this.filterForm.value.to+'</p><p>price: '+this.sortedRooms[i].price+'</p><p>capacity: '+this.sortedRooms[i].capacity+'</p>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('CANCEL');
          }
        }, {
          text: 'Book',
          handler: () => {
            this.submitAddBook(i);
          }
        }
      ]
    });
    await alert.present();
  }

  async onBookRoomError(i: number) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.chain_name+' (room #'+this.sortedRooms[i].number+') was not booked due to: '+this.errorString,
      buttons: ['OK']
    });

    await alert.present();
  }

  async onLogIn(i: number){
    let modal = await this.modalCtrl.create({
      component: LoginModal,
    })
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "signin"){
          this.onSignIn(i);
        }
        else if (data.data.closeEvent == "submit"){
          this.onBookRoomConfirm(i);
        }
      }
    });
  }

  async onSignIn(i: number){
    let modal = await this.modalCtrl.create({
      component: SigninModal,
    });
    await modal.present();
    return await modal.onWillDismiss().then((data?)=>{
      if (data.data !== undefined){
        if (data.data.closeEvent == "submit"){
          this.onBookRoomConfirm(i);
        }
      }
    });
  }

  submitAddBook(i: number){
    let bookInfo={
      room_number: this.sortedRooms[i].number,
      hotel_id: this.hotelId,
      chain_name: this.chain_name,
      check_in: this.filterForm.value.from,
      check_out: this.filterForm.value.to, 
    }
    this.bookRoomService.bookRoom(JSON.stringify(bookInfo)).subscribe(bookResponse => {
      if (bookResponse != null){
        this.addBookToast(i);
      }
      else {
        this.errorString = "server error";
        this.onBookRoomError(i);
      }
    }, err => {
      this.errorString = err;
      this.onBookRoomError(i);
    });
  }

  private filterRooms(capacity: number, price: number): Room[] {
    return this.rooms.filter(room => {
      let capacityFilter = true;
      if (capacity != 0){
        capacityFilter = capacity == room.capacity;
      }
      let priceFilter = true;
      if (price != 80){
        priceFilter = price >= room.price;
      }
      return capacityFilter && priceFilter;
    });
  }

  private async addBookToast(i: number) {
    const toast = await this.toastController.create({
      message: this.chain_name+' (room #'+this.sortedRooms[i].number+') is booked',
      duration: 2000
    });
    return toast.present();
  }

}
