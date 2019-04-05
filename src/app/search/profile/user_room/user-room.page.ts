import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/objects/book.vm';
import { Rent } from 'src/app/objects/rent.vm';
import { Customer } from 'src/app/objects/customer.vm';
import { Room } from 'src/app/objects/room.vm';
import { Hotel } from 'src/app/objects/hotel.vm';
import { Address } from 'src/app/objects/address.vm';
import { Chain } from 'src/app/objects/chain.vm';

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
    let address = new Address("7 Main St, Ottawa, Ontario, CAN, K0A 1M0");
    this.user = new Customer("jstpi047", "23434654", "Jérémie St-Pierre", address, today.toISOString());
    // hardcoded data
    let address2 = new Address("7 Main St, Ottawa, Ontario, CAN, K0A 1M0");
    let rooms: Room[];
    rooms = [
      new Room(3, "Travelodge", "test123", 40, 2, "city", true, [], []), 
      new Room(1, "Travelodge", "test123", 40, 3, "beach", true, [], [])
    ]
    this.books = [
      new Book(this.user, rooms[0], "2018-03-16", "2018-04-10", "2018-04-15", false),
      new Book(this.user, rooms[1], "2018-03-01", "2018-03-04", "2018-03-07", true)
    ]
    this.rents = [
      new Rent(this.user, rooms[0], "2018-03-24", "2018-04-30", "2018-04-15"),
      new Rent(this.user, rooms[1], "2018-03-07", "2018-03-14", "2018-03-07")
    ]

  }

  ngOnInit() {
    
  }

}
