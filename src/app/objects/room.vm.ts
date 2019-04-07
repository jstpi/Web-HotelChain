import { Rent } from './rent.vm';
import { Book } from './book.vm';
import { Hotel } from './hotel.vm';

export class Room {
    number: number;
    price: number;
    capacity: number;
    view_type: string;
    is_extendable: boolean;
    problems: string[];
    amenities: string[];
    hotel_id: string;
    chain_name: string;
    
    check_in: string;
    check_out: string;

    isBooked: boolean;
    isRented: boolean;

    constructor(number: number, hotel_id: string, chain_name: string, price: number, capacity: number, view_type: string, is_extendable: boolean, problems: string[], amenities: string[]) {
        this.number = number;
        this.price = price;
        this.capacity = capacity;
        this.view_type = view_type;
        this.is_extendable = is_extendable;
        this.problems = problems;
        this.amenities = amenities;
        this.hotel_id = hotel_id;
        this.chain_name = chain_name;
        this.check_in = "";
        this.check_out = "";
        this.isBooked = false;
        this.isRented = false;
    }
}