import { Address } from './address.vm';
import { Hotel } from './hotel.vm';

export class Chain {
    chain_name: string;
    central_office_address: Address;
    number_of_hotels: number;
    contact_email_addresses: string[];
    contact_phone_numbers: string[];
    Hotel: Hotel;
    constructor(chain_name: string, central_office_address: Address, number_of_hotels: number, contact_email_addresses: string[], contact_phone_numbers: string[],) {
        this.chain_name = chain_name;
        this.central_office_address = central_office_address;
        this.number_of_hotels = number_of_hotels;
        this.contact_email_addresses = contact_email_addresses;
        this.contact_phone_numbers = contact_phone_numbers;
    }
}