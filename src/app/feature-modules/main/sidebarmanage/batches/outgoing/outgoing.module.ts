import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutgoingRoutingModule } from './outgoing-routing.module';
import { OutgoingComponent } from './outgoing/outgoing.component';

import {SearchboxModule} from "@shared/searchbox/searchbox.module";
import {MatButtonModule} from "@angular/material";
import {SharedModule} from "@shared/share.module";
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import { CustomCheckboxModule } from '@shared/custom-checkbox/custom-checkbox.module';
import { DataListModule } from '@shared/data-list/data-list.module';
import { SelectWithLoadingModule } from '@shared/select-with-loading/select-with-loading.module'

import { OutgoingService } from './services/outgoing.service';
import { OutgoingAdapter } from './adapter/outgoing.adapter';



import { FilterFormAdapter } from './adapter/filter-form.adapter';


import { StatusAdapter } from './adapter/status.adapter';
import { StatusService } from './services/status.service';

import {  NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpConfigInterceptorProvider} from '@core/httpconfig.interceptor';

@NgModule({
    declarations: [
        OutgoingComponent
    ],
    imports: [
        CommonModule,
        OutgoingRoutingModule,
        SharedModule,
        BodyTitleModule,
        MatButtonModule,
        SearchboxModule,
        CustomCheckboxModule,
        DataListModule,
        SelectWithLoadingModule,

        NgbDropdownModule
    ],
    providers : [
        HttpConfigInterceptorProvider,
        OutgoingAdapter,
        FilterFormAdapter,
        OutgoingService,

        StatusAdapter,
        StatusService
    ]
})
export class OutgoingModule { }
