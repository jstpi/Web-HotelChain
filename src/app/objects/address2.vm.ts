export class Address2 {
    country: String;
    state_province: String;
    city: String;
    street: String;
    postalCode: String;
    constructor(country: string, state_province: string, city: string, street: string, postalCode: string) {
        this.country = country;
        this.state_province = state_province;
        this.city = city;
        this.street = street;
        this.postalCode = postalCode;
    }

    public format(): string{
        return this.street+", "+this.city+", "+this.state_province+", "+this.country+", "+this.postalCode
    }
}