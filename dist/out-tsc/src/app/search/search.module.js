import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { TabsPageRoutingModule } from './tabs.router.module';
import { SearchPage } from './search.page';
var SearchPageModule = /** @class */ (function () {
    function SearchPageModule() {
    }
    SearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                RouterModule.forChild([{ path: '', component: SearchPage }])
            ],
            declarations: [SearchPage]
        })
    ], SearchPageModule);
    return SearchPageModule;
}());
export { SearchPageModule };
//# sourceMappingURL=search.module.js.map