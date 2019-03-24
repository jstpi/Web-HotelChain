export class Employee {
    user: string;
    sin: string;
    full_name: string;
    address: string;
    roles: string[];
    constructor(user: string, sin: string, full_name: string, address: string, roles: string[]) {
        this.user = user;
        this.sin = sin;
        this.full_name = full_name;
        this.address = address;
        this.roles = roles;
    }
}