export class Address {
    address: string;
    hotel_address: string;
    constructor(fullAddress: string) {
        this.address = fullAddress;
        this.hotel_address = fullAddress;
    }
}