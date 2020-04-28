import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterListPipe} from "@shared/pipe/search";

@NgModule({
    declarations: [FilterListPipe],
    imports: [
        CommonModule
    ],
    exports: [FilterListPipe]
})
export class PipeModule {
}
