import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabheadComponent} from "./tabhead/tabhead.component";

@NgModule({
    declarations: [TabheadComponent],
    imports: [CommonModule],
    exports: [TabheadComponent]
})
export class TabheadModule {
}
