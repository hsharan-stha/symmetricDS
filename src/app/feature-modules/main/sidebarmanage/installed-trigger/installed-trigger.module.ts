import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InstalledTriggerRoutingModule} from './installed-trigger-routing.module';
import {InstalledTriggerComponent} from './installed-trigger/installed-trigger.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DataListModule} from "@shared/data-list/data-list.module";
import {ButtonbarComponent} from './buttonbar/buttonbar.component';
import {SharedModule} from "@shared/share.module";
import {SearchboxModule} from "@shared/searchbox/searchbox.module";
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {InstalledTriggerService} from "@sidebarmanage/installed-trigger/services/installed-trigger.service";
import {InstallerTriggerAdapter} from "@sidebarmanage/installed-trigger/adapter/installed-trigger.adapter";
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";
import {CustomCheckboxModule} from "@shared/custom-checkbox/custom-checkbox.module";

@NgModule({
    declarations: [InstalledTriggerComponent, ButtonbarComponent],
    imports: [
        CommonModule,
        InstalledTriggerRoutingModule,
        BodyTitleModule,
        SharedModule,
        SearchboxModule,
        MatButtonModule,
        PipeModule,
        DataListModule,
        LoaderModule,
        CustomCheckboxModule
    ],
    providers: [
        InstalledTriggerService,
        InstallerTriggerAdapter,
        HttpConfigInterceptorProvider
    ]
})
export class InstalledTriggerModule {
}
