import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SearchHotelService } from 'src/app/services/search-hotel.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss'],
})
export class HotelsPage implements OnInit {
  errorString: string;
  city: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchHotelService: SearchHotelService) {
      this.errorString = "";
      this.city = "";
  }

  ngOnInit() {
    this.errorString = "";
    let address={
      hotel_address: this.route.snapshot.params['city']
    }
    this.searchHotelService.getHotels(JSON.stringify(address)).subscribe(hotels => {
      console.log(hotels);
    }, err => {
      this.errorString = err;
    });
  }

}
