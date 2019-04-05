import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-modal',
  templateUrl: './login.modal.html',
  styleUrls: ['./login.modal.scss'],
})
export class LoginModal implements OnInit {
  private loginForm : FormGroup;
  modalCtrl: ModalController
  isSignIn: Boolean;
  isExitByButton: Boolean;

  //log in feedback
  errorString: String;

  constructor(modalCtrl: ModalController, private formBuilder: FormBuilder, private authService: AuthService) {
    this.modalCtrl = modalCtrl;
    this.loginForm = this.formBuilder.group({
      type: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isSignIn = true;
    this.isExitByButton = false;
    this.errorString = "";
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
    this.isExitByButton = true;
    this.modalCtrl.dismiss({closeEvent: "back"});
  }

  signin(){
    this.isExitByButton = true;
    this.modalCtrl.dismiss({closeEvent: "signin"});
  }

  submit(){
    this.isExitByButton = true;
    this.errorString = "";

    this.authService.login(JSON.stringify(this.loginForm.value)).subscribe(loginInfo => {
      if (loginInfo.valid){
        this.authService.setSession(loginInfo.token);
        this.modalCtrl.dismiss({closeEvent: "submit"});
      }
      else {
        this.errorString = this.authService.setError(loginInfo.token);
      }
    }, err => this.errorString = err);
  }

}
