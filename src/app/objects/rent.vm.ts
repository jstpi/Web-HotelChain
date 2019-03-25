import { Customer } from './customer.vm';
import { Room } from './room.vm';

export class Rent {
    rent_date: Date;
    check_in: Date;
    check_out: Date;
    customer: Customer;
    room: Room;
    constructor(rent_date: string, check_in: string, check_out: string, customer: Customer, room: Room) {
        this.rent_date = new Date(rent_date);
        this.check_in = new Date(check_in);
        this.check_out = new Date(check_out);
        this.customer = customer;
        this.room = room;
    }
}