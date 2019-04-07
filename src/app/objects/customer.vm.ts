import { Address } from './address.vm';

export class Customer {
    email: string;
    sin: string;
    full_name: string;
    address: Address;
    date_of_registration: Date;
    constructor(
        email: string, 
        sin: string, 
        full_name: string, 
        address: Address,
        date_of_registration: string) {
        this.email = email;
        this.sin = sin;
        this.full_name = full_name;
        this.address = address;
        this.date_of_registration = new Date(date_of_registration);
    }
}