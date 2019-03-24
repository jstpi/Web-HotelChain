export class Customer {
    user: string;
    sin: string;
    full_name: string;
    address: string;
    date_of_registration: Date;
    constructor(user: string, sin: string, full_name: string, address: string, date_of_registration: string) {
        this.user = user;
        this.sin = sin;
        this.full_name = full_name;
        this.address = address;
        this.date_of_registration = new Date(date_of_registration);
    }
}