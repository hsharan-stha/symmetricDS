import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from "@angular/material";
import {SharedModule} from "@shared/share.module";
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import { CustomCheckboxModule } from '@shared/custom-checkbox/custom-checkbox.module';
import { DataListModule } from '@shared/data-list/data-list.module';
import { SelectWithLoadingModule } from '@shared/select-with-loading/select-with-loading.module'
import { UnifunDropdownModule } from '@shared/unifun-dropdown/unifun-dropdown.module';

import { IncomingRoutingModule } from './incoming-routing.module';
import { IncomingComponent } from './incoming/incoming.component';

import { IncomingService } from './services/incoming.service';
import { IncomingAdapter } from './adapter/incoming.adapter';
import {  NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { StatusAdapter } from './../shared/adapter/status.adapter'
import { StatusService } from './../shared/services/status.service';

import {HttpConfigInterceptorProvider} from '@core/httpconfig.interceptor';

@NgModule({
    declarations: [
        IncomingComponent
    ],
    imports: [
        CommonModule,
        IncomingRoutingModule,

        SharedModule,
        BodyTitleModule,
        MatButtonModule,
        CustomCheckboxModule,
        DataListModule,
        SelectWithLoadingModule,
        NgbDropdownModule
    ],

    providers : [
        HttpConfigInterceptorProvider,

        IncomingAdapter,
        IncomingService,

        StatusAdapter,
        StatusService
    ]
})
export class IncomingModule { }

