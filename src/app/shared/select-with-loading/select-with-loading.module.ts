import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoaderModule } from '@shared/loader/loader.module';

import {SelectWithLoadingComponent} from './select-with-loading/select-with-loading.component';

@NgModule({
    declarations: [
        SelectWithLoadingComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoaderModule
    ],
    exports: [
        SelectWithLoadingComponent
    ]
})
export class SelectWithLoadingModule {
}
