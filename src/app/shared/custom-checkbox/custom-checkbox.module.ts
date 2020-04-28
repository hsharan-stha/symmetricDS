import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CustomCheckboxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports : [
        CustomCheckboxComponent
    ]
})
export class CustomCheckboxModule { }
