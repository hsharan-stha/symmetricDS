import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyTitleComponent } from './body-title/body-title.component';

@NgModule({
    declarations: [BodyTitleComponent],
    imports: [
        CommonModule
    ],
    exports : [
        BodyTitleComponent
    ]
})
export class BodyTitleModule { }
