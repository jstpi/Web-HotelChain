import { Address } from './address.vm';

export class BookRent {
    chain_name: string;
    address: Address;
    room_number: number;
    check_in: string;
    check_out: string;
    capacity: string;
    is_book: boolean;

    constructor(chain_name: string, address: Address, room_number: number, check_in: string, check_out: string, capacity: string, is_book: boolean) {
        this.chain_name = chain_name;
        this.address = address;
        this.room_number = room_number;
        this.check_in = check_in;
        this.check_out = check_out;
        this.is_book = is_book;
        this.capacity = capacity;
    }
}