import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggingRoutingModule} from './logging-routing.module';

import {LoggingComponent} from './logging/logging.component';

import {SearchboxModule} from "@shared/searchbox/searchbox.module";
import {MatButtonModule} from "@angular/material";
import {SharedModule} from "@shared/share.module";
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {CustomCheckboxModule} from '@shared/custom-checkbox/custom-checkbox.module';
import {LoaderModule} from "@shared/loader/loader.module";

import {LoggingService} from './services/logging.service';
import {LoggingAdapter} from './adapter/logging.adapter';
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";

@NgModule({
    declarations: [
        LoggingComponent
    ],
    imports: [
        CommonModule,
        LoggingRoutingModule,
        SharedModule,
        BodyTitleModule,
        MatButtonModule,
        SearchboxModule,
        CustomCheckboxModule,
        LoaderModule
    ],

    providers: [
        HttpConfigInterceptorProvider,
        LoggingAdapter,
        LoggingService
    ]
})
export class LoggingModule {
}
