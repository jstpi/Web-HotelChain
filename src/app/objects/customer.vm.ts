import { Rent } from './rent.vm';
import { Book } from './book.vm';

export class Customer {
    user: string;
    sin: string;
    full_name: string;

    country: String;
    state_province: String;
    city: String;
    street: String;
    postalCode: String;

    date_of_registration: Date;
    rents: Rent[];
    books: Book[];
    constructor(
        user: string, 
        sin: string, 
        full_name: string, 
        country: string, 
        state_province: string,
        city: string,
        street: string,
        postalCode: string,
        date_of_registration: string) {
        this.user = user;
        this.sin = sin;
        this.full_name = full_name;
        this.country = country;
        this.state_province = state_province;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.date_of_registration = new Date(date_of_registration);
    }
}