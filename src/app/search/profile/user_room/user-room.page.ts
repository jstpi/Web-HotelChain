import { Component, OnInit } from '@angular/core';
import { BookRent } from 'src/app/objects/book-rent.vm';
import { Address } from 'src/app/objects/address.vm';
import { BookRentService } from 'src/app/services/book-rent.service';

@Component({
  selector: 'app-room',
  templateUrl: './user-room.page.html',
  styleUrls: ['./user-room.page.scss'],
})
export class UserRoomPage implements OnInit {
  errorString: string;
  book_rents: BookRent[];
  
  constructor(private bookRentService: BookRentService) { 
    this.book_rents = [];
  }

  ngOnInit() {
    this.bookRentService.getBookRent(JSON.stringify("")).subscribe(book_rents => {
      console.log(book_rents);
      if (book_rents != null){
        book_rents.forEach(book_rent => {
          this.book_rents.push(new BookRent(book_rent.chain_name, new Address(book_rent.address), book_rent.room_number, book_rent.check_in, book_rent.check_out, book_rent.capacity, book_rent.is_book));
        });
      }
      else {
        this.errorString = "No book or rent founded";
      }
    }, err => {
      this.errorString = err;
    });
  }

}
