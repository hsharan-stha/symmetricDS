import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataListComponent} from './data-list/data-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from "@shared/pipe/pipe.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {DataListDirective, DataTableDirective} from "@shared/data-list/data-list/data-list.directive";
import {TableHeaderComponent} from './data-list/table-header/table-header.component';
import {MatButtonModule} from "@angular/material";
import {PaginationModule} from "@shared/pagination/pagination.module";
import {ScrollPaginationDirective} from './data-list/scroll-pagination.directive';
import {SearchboxModule} from "@shared/searchbox/searchbox.module";
import { UnifunDropdownModule } from '@shared/unifun-dropdown/unifun-dropdown.module';
import {  NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [DataListComponent, DataListDirective, DataTableDirective, TableHeaderComponent, ScrollPaginationDirective,],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipeModule,
        LoaderModule,
        MatButtonModule,
        PaginationModule,
        SearchboxModule,
        UnifunDropdownModule,
        NgbDropdownModule 
       
    ],
    exports: [
        DataListComponent
    ]
})
export class DataListModule {
}
