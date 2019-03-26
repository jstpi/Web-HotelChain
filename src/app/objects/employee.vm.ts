import { Hotel } from './hotel.vm';
import { Address } from './address.vm';

export class Employee {
    user: string;
    sin: string;
    full_name: string;
    address: Address;
    roles: string[];
    hotel: Hotel
    constructor(
        hotel: Hotel,
        user: string, 
        sin: string, 
        full_name: string, 
        address: Address,
        roles: string[]) {
        this.user = user;
        this.sin = sin;
        this.full_name = full_name;
        this.address = address;
        this.roles = roles;
        this.hotel = hotel;
    }
}