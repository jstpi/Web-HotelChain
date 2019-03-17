import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.scss'],
})
export class LoginModal implements OnInit {

  constructor(navParams: NavParams) { }

  ngOnInit() {}

}
