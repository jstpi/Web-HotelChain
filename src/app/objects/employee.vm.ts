import { Hotel } from './hotel.vm';
import { Address } from './address.vm';

export class Employee {
    email: string;
    sin: string;
    full_name: string;
    address: Address;
    roles: string[];
    hotel: Hotel;
    constructor(
        sin: string, 
        email: string, 
        full_name: string, 
        address: Address,
        roles: string[]) {
        this.email = email;
        this.sin = sin;
        this.full_name = full_name;
        this.address = address;
        this.roles = roles;
    }
}