import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmBoxComponent} from './confirm-box/confirm-box.component';
import {MatButtonModule} from "@angular/material";
import {LoaderModule} from "@shared/loader/loader.module";

@NgModule({
    declarations: [ConfirmBoxComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        LoaderModule
    ],
    exports: [
        ConfirmBoxComponent
    ]
})
export class ConfirmBoxModule {
}
