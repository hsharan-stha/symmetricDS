import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TableroutingRoutingModule} from './tablerouting-routing.module';
import {TableroutingComponent} from './tablerouting/tablerouting.component';
import {CreateComponent} from './create/create.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {SharedModule} from "@shared/share.module";
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {TableRoutingService} from "./services/table-routing.service";
import {TableRoutingAdapter} from "./adapter/tablerouting.adapter";
import {DataListModule} from "@shared/data-list/data-list.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {ConfirmBoxModule} from "@shared/confirm-box/confirm-box.module";
import {CustomCheckboxModule} from "@shared/custom-checkbox/custom-checkbox.module";
import {DeleteComponent} from './delete/delete.component';
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";

@NgModule({
    declarations: [TableroutingComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        TableroutingRoutingModule,
        BodyTitleModule,
        DialogModule,
        ButtonbarModule,
        TabheadModule,
        SharedModule,
        MatButtonModule,
        PipeModule,
        DataListModule,
        MessageboxModule,
        LoaderModule,
        ConfirmBoxModule,
        CustomCheckboxModule
    ],
    providers: [
        TableRoutingService,
        TableRoutingAdapter,
        HttpConfigInterceptorProvider
    ]
})
export class TableroutingModule {
}
