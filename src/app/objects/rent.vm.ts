export class Rent {
    rent_date: Date;
    check_in: Date;
    check_out: Date;
    constructor(rent_date: string, check_in: string, check_out: string) {
        this.rent_date = new Date(rent_date);
        this.check_in = new Date(check_in);
        this.check_out = new Date(check_out);
    }
}