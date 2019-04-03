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
  city: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchHotelService: SearchHotelService) { 
      this.errorString = "";
  }

  ngOnInit() {
    this.errorString = "";
    this.city = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('city');
      })
    );
    this.searchHotelService.getHotels(JSON.stringify(this.city)).subscribe(hotels => {
      console.log(hotels);
    }, err => {
      this.errorString = err;
    });
  }

}
