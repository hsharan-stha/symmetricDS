import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnifunDropdownMenuDirective , UnifunDropdownDirective , UnifunDropdownToggleDirective, UfDropdownItem } from './unifun-dropdown.directive';


@NgModule({
    imports: [
        CommonModule

    ],
    declarations: [
        UfDropdownItem,
        UnifunDropdownMenuDirective ,
        UnifunDropdownDirective ,
        UnifunDropdownToggleDirective
    ],
    exports:[
        UfDropdownItem,
        UnifunDropdownMenuDirective ,
        UnifunDropdownDirective ,
        UnifunDropdownToggleDirective
    ]
})
export class UnifunDropdownModule { }
