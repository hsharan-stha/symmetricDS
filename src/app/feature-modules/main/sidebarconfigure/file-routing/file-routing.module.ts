import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FileRoutingRoutingModule} from './file-routing-routing.module';
import {FileRoutingComponent} from "./file-routing/file-routing.component";
import {CreateComponent} from "./create/create.component";
import {DeleteComponent} from "./delete/delete.component";
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {SharedModule} from "@shared/share.module";
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {DataListModule} from "@shared/data-list/data-list.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {ConfirmBoxModule} from "@shared/confirm-box/confirm-box.module";
import {CustomCheckboxModule} from "@shared/custom-checkbox/custom-checkbox.module";
import {FileRoutingService} from "./services/file-routing.service";
import {FileRoutingAdapter} from "./adapter/file-routing.adapter";
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";

@NgModule({
    declarations: [FileRoutingComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        FileRoutingRoutingModule,
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
    providers: [FileRoutingService, FileRoutingAdapter, HttpConfigInterceptorProvider]
})
export class FileRoutingModule {
}
