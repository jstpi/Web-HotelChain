import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Customer } from 'src/app/objects/customer.vm';
import { Address } from 'src/app/objects/address.vm';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.page.html',
  styleUrls: ['./hotel-info.page.scss'],
})
export class HotelInfoPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
