import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.scss'],
})
export class LoginModal implements OnInit {
  private loginForm : FormGroup;
  isSignIn: Boolean;

  constructor(navParams: NavParams, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      type: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required],
    });
    this.isSignIn = true;
  }

  ngOnInit() {
    let typeControl = this.loginForm.get('type');
    typeControl.valueChanges.forEach(
      (value: string) => {
        if (value == "Employee"){
          this.isSignIn = false;
        }
        else {
          this.isSignIn = true;
        }
      }
    );
  }

  submit(){
    console.log(this.loginForm.value);
  }

}
