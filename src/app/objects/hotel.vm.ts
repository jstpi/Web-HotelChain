import { Room } from './room.vm';
import { Employee } from './employee.vm';
import { Address } from './address.vm';

export class Hotel {
    chain_name: string;
    hotel_id: string;
    rating: number;
    number_of_rooms: number;
    hotel_address: Address;
    contact_email_address: string;
    contact_phone_numbers: string[];

    //special attribute
    minPrice: number;
    capacities: number[];

    rooms: Room[];
    employee: Employee[];
    constructor(
        chain_name: string, 
        hotel_id: string, 
        rating: number, 
        number_of_rooms: number, 
        hotel_address: Address, 
        contact_email_address: string, 
        contact_phone_numbers: string[], 
        minPrice: number,
        capacities: number[]) {
            this.chain_name = chain_name;
            this.hotel_id = hotel_id;
            this.rating = rating;
            this.number_of_rooms = number_of_rooms;
            this.hotel_address = hotel_address;
            this.contact_email_address = contact_email_address;
            this.contact_phone_numbers = contact_phone_numbers;
            this.capacities = capacities;
            this.minPrice = minPrice;
    }
}