export class Book {
    book_date: Date;
    check_in: Date;
    check_out: Date;
    is_canceled: boolean;
    constructor(book_date: string, check_in: string, check_out: string, is_canceled: boolean) {
        this.book_date = new Date(book_date);
        this.check_in = new Date(check_in);
        this.check_out = new Date(check_out);
        this.is_canceled = is_canceled;
    }
}