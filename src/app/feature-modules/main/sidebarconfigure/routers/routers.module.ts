import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RoutersRoutingModule} from './routers-routing.module';
import {RoutersComponent} from './routers/routers.component';
import {CreateComponent} from './create/create.component';


import {BodyTitleModule} from '@shared/body-title/body-title.module';
import {SearchboxModule} from '@shared/searchbox/searchbox.module';
import {MatButtonModule} from "@angular/material";
import {SharedModule} from "@shared/share.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {TabheadModule} from "../tabhead/tabhead.module";

import {ConfirmBoxModule} from '@shared/confirm-box/confirm-box.module';
import {DataListModule} from '@shared/data-list/data-list.module';

import {CustomCheckboxModule} from '@shared/custom-checkbox/custom-checkbox.module';
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {DeleteComponent} from './delete/delete.component';

import {LoaderModule} from "@shared/loader/loader.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {HttpConfigInterceptorProvider} from '@core/httpconfig.interceptor';

import {RoutersService} from './services/routers.service';
import {NodeGroupIdService} from './services/node-group-id.service';
import {RouterTypeService} from "./services/router-type.service";


@NgModule({
    declarations: [
        RoutersComponent,
        CreateComponent,
        DeleteComponent
    ],

    imports: [
        CommonModule,
        RoutersRoutingModule,
        SharedModule,
        MatButtonModule,
        BodyTitleModule,
        SearchboxModule,
        DialogModule,
        TabheadModule,
        CustomCheckboxModule,
        ButtonbarModule,
        ConfirmBoxModule,
        DataListModule,
        MessageboxModule,
        LoaderModule
    ],

    providers: [
        RouterTypeService,
        NodeGroupIdService
    ]
})
export class RoutersModule {
}
