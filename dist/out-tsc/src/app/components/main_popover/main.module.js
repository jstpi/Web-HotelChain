import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPopover } from './main.popover';
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule, ReactiveFormsModule,
                RouterModule.forChild([{ path: '', component: MainPopover }])
            ],
            declarations: [MainPopover],
        })
    ], MainModule);
    return MainModule;
}());
export { MainModule };
//# sourceMappingURL=main.module.js.map