import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/objects/book.vm';
import { Rent } from 'src/app/objects/rent.vm';
import { Customer } from 'src/app/objects/customer.vm';
import { Room } from 'src/app/objects/room.vm';
import { Hotel } from 'src/app/objects/hotel.vm';
import { Address } from 'src/app/objects/address.vm';

@Component({
  selector: 'app-room',
  templateUrl: './user-room.page.html',
  styleUrls: ['./user-room.page.scss'],
})
export class UserRoomPage implements OnInit {
  books: Book[];
  rents: Rent[];
  user: Customer;
  
  constructor() { 
    let today = new Date();
    let address = new Address("CAN", "Ontario", "Ottawa", "7, Main St.", "K0A 1M0");
    this.user = new Customer("jstpi047", "23434654", "Jérémie St-Pierre", address, today.toISOString());
    // hardcoded data
    let address2 = new Address("CAN", "Ontario", "Casselman", "7, Main St.", "K0A 1M0");
    let hotel = new Hotel("test123", 4, 20, address2, "test@gmail.com", ["819-213-9990"]);
    let rooms: Room[];
    rooms = [
      new Room(3, 40, 2, "city", true, [], [], hotel), 
      new Room(1, 40, 2, "beach", true, [], [], hotel)
    ]
    this.books = [
      new Book("2018-03-16", "2018-04-10", "2018-04-15", false, this.user, rooms[0]),
      new Book("2018-03-01", "2018-03-04", "2018-03-07", true, this.user, rooms[1])
    ]
    this.rents = [
      new Rent("2018-03-24", "2018-04-30", "2018-04-15", this.user, rooms[0]),
      new Rent("2018-03-07", "2018-03-14", "2018-03-07", this.user, rooms[1])
    ]

  }

  ngOnInit() {
    
  }

}
