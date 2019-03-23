import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
var LoginModal = /** @class */ (function () {
    function LoginModal(modalCtrl, formBuilder) {
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        this.loginForm = this.formBuilder.group({
            type: ['', Validators.required],
            user: ['', Validators.required],
            pass: ['', Validators.required],
        });
        this.isSignIn = true;
        this.isExitByButton = false;
    }
    LoginModal.prototype.ngOnInit = function () {
        var _this = this;
        var typeControl = this.loginForm.get('type');
        typeControl.valueChanges.forEach(function (value) {
            if (value == "Employee") {
                _this.isSignIn = false;
            }
            else {
                _this.isSignIn = true;
            }
        });
    };
    LoginModal.prototype.ngOnDestroy = function () {
        if (!this.isExitByButton) {
            this.modalCtrl.dismiss({ closeEvent: "back" });
        }
    };
    LoginModal.prototype.back = function () {
        this.isExitByButton = true;
        this.modalCtrl.dismiss({ closeEvent: "back" });
    };
    LoginModal.prototype.signin = function () {
        this.isExitByButton = true;
        this.modalCtrl.dismiss({ closeEvent: "signin" });
    };
    LoginModal.prototype.submit = function () {
        this.isExitByButton = true;
        console.log(this.loginForm.value);
        this.modalCtrl.dismiss({ closeEvent: "submit" });
    };
    LoginModal = tslib_1.__decorate([
        Component({
            selector: 'login-modal',
            templateUrl: './login.modal.html',
            styleUrls: ['./login.modal.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, FormBuilder])
    ], LoginModal);
    return LoginModal;
}());
export { LoginModal };
//# sourceMappingURL=login.modal.js.map