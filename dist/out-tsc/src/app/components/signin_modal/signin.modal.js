import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder } from '@angular/forms';
var SigninModal = /** @class */ (function () {
    function SigninModal(modalCtrl, formBuilder) {
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        this.isCountryChosen = false;
        this.isStateProvChosen = false;
        this.isCAN = false;
        this.signinForm = this.formBuilder.group({
            user: ['', Validators.required],
            pass: ['', Validators.required],
            fullName: ['', Validators.required],
            sin: ['', Validators.required],
            country: [''],
            state_province: [''],
            city: [''],
            street: [''],
            postalCode: [''],
        });
        this.provinces = [
            "Ontario",
            "Quebec",
            "Nova Scotia",
            "New Brunswick",
            "Manitoba",
            "British Columbia",
            "Prince Edward Island",
            "Saskatchewan",
            "Alberta",
            "Newfoundland and Labrador",
            "Northwest Territories",
            "Yukon",
            "Nunavut"
        ];
        this.sates = [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        ];
    }
    SigninModal.prototype.ngOnInit = function () {
        var _this = this;
        var typeControl = this.signinForm.get('country');
        typeControl.valueChanges.forEach(function (value) {
            _this.signinForm.get('state_province').setValue("");
            _this.signinForm.get('city').setValue("");
            _this.signinForm.get('street').setValue("");
            _this.signinForm.get('postalCode').setValue("");
            if (value == "CAN") {
                _this.isCountryChosen = true;
                _this.isCAN = true;
            }
            else if (value == "USA") {
                _this.isCountryChosen = true;
                _this.isCAN = false;
            }
            else {
                _this.isCountryChosen = false;
            }
        });
        var stateProvControl = this.signinForm.get('state_province');
        stateProvControl.valueChanges.forEach(function (value) {
            _this.signinForm.get('city').setValue("");
            _this.signinForm.get('street').setValue("");
            _this.signinForm.get('postalCode').setValue("");
            if (value != "") {
                _this.isStateProvChosen = true;
            }
            else {
                _this.isStateProvChosen = false;
            }
        });
    };
    SigninModal.prototype.back = function () {
        this.modalCtrl.dismiss({ closeEvent: "back" });
    };
    SigninModal.prototype.submit = function () {
        console.log(this.signinForm.value);
        this.modalCtrl.dismiss({ closeEvent: "submit" });
    };
    SigninModal = tslib_1.__decorate([
        Component({
            selector: 'signin-modal',
            templateUrl: './signin.modal.html',
            styleUrls: ['./signin.modal.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController, FormBuilder])
    ], SigninModal);
    return SigninModal;
}());
export { SigninModal };
//# sourceMappingURL=signin.modal.js.map