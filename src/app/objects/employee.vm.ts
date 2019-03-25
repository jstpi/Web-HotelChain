import { Hotel } from './hotel.vm';

export class Employee {
    user: string;
    sin: string;
    full_name: string;

    country: String;
    state_province: String;
    city: String;
    street: String;
    postalCode: String;

    roles: string[];
    hotel: Hotel
    constructor(
        user: string, 
        sin: string, 
        full_name: string, 
        country: string, 
        state_province: string,
        city: string,
        street: string,
        postalCode: string,
        roles: string[], 
        hotel: Hotel) {
        this.user = user;
        this.sin = sin;
        this.full_name = full_name;
        this.country = country;
        this.state_province = state_province;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
        this.roles = roles;
        this.hotel = hotel;
    }
}