import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "@shared/share.module";
import { ConfirmBoxModule } from '@shared/confirm-box/confirm-box.module';
import { BodyTitleModule } from '@shared/body-title/body-title.module';
import { SearchboxModule } from '@shared/searchbox/searchbox.module';
import {MatButtonModule} from "@angular/material";
import {DialogModule} from "@shared/dialog/dialog.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import { DataListModule } from '@shared/data-list/data-list.module';

import { CustomCheckboxModule } from '@shared/custom-checkbox/custom-checkbox.module';
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {LoaderModule} from "@shared/loader/loader.module";
import { MessageboxModule } from "@shared/messagebox/messagebox.module";
import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './parameters/parameters.component';
import { CreateComponent } from './create/create.component';

import { HttpConfigInterceptorProvider } from '@core/httpconfig.interceptor';
import { ParametersService } from './services/parameters.service';
import { NodeGroupIdService } from './services/node-group-id.service';
import { ParametersAdapter } from './adapter/parameters.adapter';

import { NodeGroupIdAdapter } from './adapter/node-group-id.adapter';
import { SelectWithLoadingComponent } from './select-with-loading/select-with-loading.component';

@NgModule({
    declarations: [
        ParametersComponent,
        CreateComponent,
        SelectWithLoadingComponent  
    ],
    imports: [
        CommonModule,
        ParametersRoutingModule,

        SharedModule,
        ConfirmBoxModule,

        MatButtonModule,
        BodyTitleModule,
        SearchboxModule,
        DialogModule,
        TabheadModule,
        CustomCheckboxModule,
        ButtonbarModule,
        SearchboxModule,
        DataListModule,
        MessageboxModule,
        LoaderModule
    ],

    providers : [
        HttpConfigInterceptorProvider,
        ParametersService,
        ParametersAdapter,
        NodeGroupIdAdapter,
        NodeGroupIdService
    ]
})
export class ParametersModule { }
