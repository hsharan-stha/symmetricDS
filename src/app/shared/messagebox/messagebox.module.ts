import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageboxComponent} from './messagebox/messagebox.component';

@NgModule({
    declarations: [MessageboxComponent],
    imports: [
        CommonModule
    ],
    exports: [
        MessageboxComponent
    ]


})
export class MessageboxModule {
}
