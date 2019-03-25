import { Rent } from './rent.vm';
import { Book } from './book.vm';
import { Address } from './address.vm';

export class Customer {
    user: string;
    sin: string;
    full_name: string;
    address: Address;
    date_of_registration: Date;
    rents: Rent[];
    books: Book[];
    constructor(
        user: string, 
        sin: string, 
        full_name: string, 
        address: Address,
        date_of_registration: string) {
        this.user = user;
        this.sin = sin;
        this.full_name = full_name;
        this.address = address;
        this.date_of_registration = new Date(date_of_registration);
    }
}