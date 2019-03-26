import { Customer } from './customer.vm';
import { Room } from './room.vm';
import * as moment from 'moment';

export class Rent {
    rent_date: Date;
    check_in: Date;
    check_out: Date;
    customer: Customer;
    room: Room;

    rent_date_format: string;
    check_in_format: string;
    check_out_format: string;

    constructor(customer: Customer, room: Room, rent_date: string, check_in: string, check_out: string) {
        this.rent_date = new Date(rent_date);
        this.check_in = new Date(check_in);
        this.check_out = new Date(check_out);
        this.customer = customer;
        this.room = room;

        this.rent_date_format = this.formatDate(this.rent_date);
        this.check_in_format = this.formatDate(this.check_in);
        this.check_out_format = this.formatDate(this.check_out);
    }

    // Format ex: 03/25/2019
    formatDate(date: Date){
        let formatMoment = moment(date);
        return formatMoment.format('L');
    }
}