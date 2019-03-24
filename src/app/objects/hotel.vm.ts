export class Hotel {
    hotel_id: string;
    rating: number;
    number_of_rooms: number;
    hotel_address: string;
    contact_email_address: string;
    contact_phone_numbers: string[];
    constructor(hotel_id: string, rating: number, number_of_rooms: number, hotel_address: string, contact_email_address: string, contact_phone_numbers: string[]) {
        this.hotel_id = hotel_id;
        this.rating = rating;
        this.number_of_rooms = number_of_rooms;
        this.hotel_address = hotel_address;
        this.contact_email_address = contact_email_address;
        this.contact_phone_numbers = contact_phone_numbers;
    }
}