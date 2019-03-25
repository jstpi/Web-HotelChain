import { Injectable } from '@angular/core';
import { Employee } from '../objects/employee.vm';
import { Customer } from '../objects/customer.vm';
import { Hotel } from '../objects/hotel.vm';
import { Room } from '../objects/room.vm';
import { Rent } from '../objects/rent.vm';
import { Book } from '../objects/book.vm';

@Injectable({
    providedIn: 'root'
})
export class NavService {
   customer: Customer;
   employee: Employee;
   hotel: Hotel;
   room: Room;
   rent: Rent;
   book: Book;
}