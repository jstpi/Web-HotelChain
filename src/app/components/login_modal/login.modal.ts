import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.scss'],
})
export class LoginModal implements OnInit {
  private loginForm : FormGroup;
  modalCtrl: ModalController
  isSignIn: Boolean;

  constructor(modalCtrl: ModalController, private formBuilder: FormBuilder) {
    this.modalCtrl = modalCtrl;
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

  back(){
    this.modalCtrl.dismiss();
  }

  submit(){
    this.modalCtrl.dismiss();
    console.log(this.loginForm.value);
  }

}
