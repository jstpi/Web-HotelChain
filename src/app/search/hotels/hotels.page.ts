import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SearchHotelService } from 'src/app/services/search-hotel.service';
import { Hotel } from 'src/app/objects/hotel.vm';
import { Address } from 'src/app/objects/address.vm';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss'],
})
export class HotelsPage implements OnInit {
  private filterForm : FormGroup;
  errorString: string;
  hotels: Hotel[];
  sortedHotels: Hotel[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchHotelService: SearchHotelService,
    private formBuilder: FormBuilder) {
      this.errorString = "";
      this.hotels = [];
      this.sortedHotels = [];
      this.filterForm = this.formBuilder.group({
        area: ['', Validators.required],
        capacity: ["0"],
        rating: [0],
        price: [80],
        hotel_chain: ['']
      });
  }

  ngOnInit() {
    this.errorString = "";
    let area = this.route.snapshot.params['city'];
    let address={
      hotel_address: this.route.snapshot.params['city']
    }
    this.searchHotelService.getHotels(JSON.stringify(address)).subscribe(hotels => {
      console.log(hotels);
      if (hotels != null){
        hotels.forEach(hotel => {
          this.hotels.push(new Hotel(hotel.chain_name, hotel.hotel_id, hotel.rating, hotel.number_of_rooms, new Address(hotel.hotel_address), hotel.contact_email_address, [""], hotel.minPrice, [0]));
        }); 
        this.sortedHotels  = Object.assign([], this.hotels);
      }
      else {
        this.errorString = "No hotel was founded";
      }
    }, err => {
      this.errorString = err;
    });

    this.filterForm.patchValue({
      area: area,
    });

    this.onFilter();
  }

  refresh(){
    this.hotels = [];
    let address={
      hotel_address: this.filterForm.value.area
    }
    this.searchHotelService.getHotels(JSON.stringify(address)).subscribe(hotels => {
      console.log(hotels);
      if (hotels != null){
        hotels.forEach(hotel => {
          this.hotels.push(new Hotel(hotel.chain_name, hotel.hotel_id, hotel.rating, hotel.number_of_rooms, new Address(hotel.hotel_address), hotel.contact_email_address, [""], hotel.minPrice, hotel.capacities));
        }); 
        this.sortedHotels  = Object.assign([], this.hotels);
      }
      else {
        this.errorString = "No hotel was founded";
      }
    }, err => {
      this.errorString = err;
    });

    this.onFilter();
  }

  onFilter(){
    let capacity = parseInt(this.filterForm.value.capacity);
    this.sortedHotels = this.filterHotels(this.filterForm.value.hotel_chain, capacity, this.filterForm.value.rating, this.filterForm.value.price);
  }

  onChooseHotel(i: number){
    let capacity = parseInt(this.filterForm.value.capacity);
    this.router.navigate(['search/room', {
      hotelId: this.sortedHotels[i].hotel_id,
      chain_name: this.sortedHotels[i].chain_name,
      price: this.filterForm.value.price,
      capacity: capacity,
    }]);
  }

  private filterHotels(hotel_chain: string, capacity: number, rating: number, price: number): Hotel[] {
    return this.hotels.filter(hotel => {
      let hotelChainFilter = hotel.chain_name.toLowerCase().indexOf(hotel_chain.toLowerCase()) > -1;
      let capacityFilter = true;
      if (capacity != 0 || hotel.capacities != null){
        capacityFilter = hotel.capacities.indexOf(capacity) > -1;
      }
      let ratingFilter = rating <= hotel.rating;
      let priceFilter = true;
      if (price != 80){
        priceFilter = price >= hotel.minPrice;
      }
      return hotelChainFilter && capacityFilter && ratingFilter && priceFilter;
    });
  }

}
