import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchRoomsService } from 'src/app/services/search-rooms.service';
import { Room } from 'src/app/objects/room.vm';
import * as moment from 'moment';

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
    private route: ActivatedRoute,
    private router: Router,
    private searchRoomsService: SearchRoomsService,
    private formBuilder: FormBuilder) {
      this.errorString = "";
      this.rooms = [];
      this.sortedRooms = [];
      this.filterForm = this.formBuilder.group({
        from: ['', Validators.required],
        to: ['', Validators.required],
        price: [500],
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

  private filterRooms(capacity: number, price: number): Room[] {
    return this.rooms.filter(room => {
      let capacityFilter = true;
      if (capacity != 0){
        capacityFilter = capacity == room.capacity;
      }
      let priceFilter = true;
      if (price != 500){
        priceFilter = price >= room.price;
      }
      return capacityFilter && priceFilter;
    });
  }

}
