export class Room {
    number: number;
    price: number;
    capacity: number;
    view_type: string;
    is_extendable: boolean;
    problems: string[];
    amenities: string[];
    constructor(number: number, price: number, capacity: number, view_type: string, is_extendable: boolean, problems: string[], amenities: string[]) {
        this.number = number;
        this.price = price;
        this.capacity = capacity;
        this.view_type = view_type;
        this.is_extendable = is_extendable;
        this.problems = problems;
        this.amenities = amenities;
    }
}