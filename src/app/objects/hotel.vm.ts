import { Room } from './room.vm';
import { Employee } from './employee.vm';
import { Address } from './address.vm';
import { Chain } from './chain.vm';

export class Hotel {
    hotel_id: string;
    rating: number;
    number_of_rooms: number;
    hotel_address: Address;
    contact_email_address: string;
    contact_phone_numbers: string[];
    chain: Chain;
    rooms: Room[];
    employee: Employee[];
    constructor(chain: Chain, hotel_id: string, rating: number, number_of_rooms: number, hotel_address: Address, contact_email_address: string, contact_phone_numbers: string[]) {
        this.chain = chain;
        this.hotel_id = hotel_id;
        this.rating = rating;
        this.number_of_rooms = number_of_rooms;
        this.hotel_address = hotel_address;
        this.contact_email_address = contact_email_address;
        this.contact_phone_numbers = contact_phone_numbers;
    }
}