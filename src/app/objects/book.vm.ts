import { Customer } from './customer.vm';
import { Room } from './room.vm';

export class Book {
    book_date: Date;
    check_in: Date;
    check_out: Date;
    is_canceled: boolean;
    customer: Customer;
    room: Room;
    constructor(book_date: string, check_in: string, check_out: string, is_canceled: boolean, customer: Customer, room: Room) {
        this.book_date = new Date(book_date);
        this.check_in = new Date(check_in);
        this.check_out = new Date(check_out);
        this.is_canceled = is_canceled;
        this.customer = customer;
        this.room = room;
    }
}