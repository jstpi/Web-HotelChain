import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Customer } from 'src/app/objects/customer.vm';
import { Address } from 'src/app/objects/address.vm';

@Component({
  selector: 'app-hotel-employee',
  templateUrl: './hotel-employee.page.html',
  styleUrls: ['./hotel-employee.page.scss'],
})
export class HotelEmployeePage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
