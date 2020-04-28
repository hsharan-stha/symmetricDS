import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {ButtonbarComponent} from "./buttonbar/buttonbar.component";
import { SearchboxModule } from '@shared/searchbox/searchbox.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ButtonbarComponent],
    imports: [CommonModule,SearchboxModule,MatButtonModule,RouterModule],
    exports: [
        ButtonbarComponent
    ]
})
export class ButtonbarModule {
}
