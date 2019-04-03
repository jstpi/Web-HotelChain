import { Hotel } from './hotel.vm';

export class Admin {
    sin: string;
    full_name: string;
    email: string;
    hotels: Hotel[];
    constructor(
        sin: string, 
        full_name: string, 
        email: string) {
        this.sin = sin;
        this.full_name = full_name;
        this.email = email;
    }
}