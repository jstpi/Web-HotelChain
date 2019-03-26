import { Customer } from './customer.vm';
import { Room } from './room.vm';
import * as moment from 'moment';

export class Book {
    book_date: Date;
    check_in: Date;
    check_out: Date;
    is_canceled: boolean;
    customer: Customer;
    room: Room;

    book_date_format: string;
    check_in_format: string;
    check_out_format: string;

    constructor(customer: Customer, room: Room, book_date: string, check_in: string, check_out: string, is_canceled: boolean) {
        this.book_date = new Date(book_date);
        this.check_in = new Date(check_in);
        this.check_out = new Date(check_out);
        this.is_canceled = is_canceled;
        this.customer = customer;
        this.room = room;

        this.book_date_format = this.formatDate(this.book_date);
        this.check_in_format = this.formatDate(this.check_in);
        this.check_out_format = this.formatDate(this.check_out);
    }

    // Format ex: 03/25/2019
    formatDate(date: Date){
        let formatMoment = moment(date);
        return formatMoment.format('L');
    }
}