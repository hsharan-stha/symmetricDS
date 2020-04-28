import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransformTableRoutingModule} from './transform-table-routing.module';
import {TransformTableComponent} from './transform-table/transform-table.component';
import {GroupsRoutingModule} from "@sidebarconfigure/groups/groups-routing.module";
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "@sidebarconfigure/buttonbar/buttonbar.module";
import {TabheadModule} from "@sidebarconfigure/tabhead/tabhead.module";
import {SharedModule} from "@shared/share.module";
import {PipeModule} from "@shared/pipe/pipe.module";
import {MatButtonModule} from "@angular/material";
import {LoaderModule} from "@shared/loader/loader.module";
import {ConfirmBoxModule} from "@shared/confirm-box/confirm-box.module";
import {DataListModule} from "@shared/data-list/data-list.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";
import {TransformTableService} from "@sidebarconfigure/transform-table/service/transform-table.service";
import {TransformTableAdapter} from "@sidebarconfigure/transform-table/adapter/transform-table.adapter";
import {CreateComponent} from './create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {NodeGroupIdService} from "@sidebarconfigure/routers/services/node-group-id.service";
import {CustomCheckboxModule} from "@shared/custom-checkbox/custom-checkbox.module";

@NgModule({
    declarations: [TransformTableComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        TransformTableRoutingModule,
        BodyTitleModule,
        DialogModule,
        ButtonbarModule,
        TabheadModule,
        SharedModule,
        PipeModule,
        MatButtonModule,
        LoaderModule,
        ConfirmBoxModule,
        DataListModule,
        MessageboxModule,
        CustomCheckboxModule,
        
    ],
    providers: [
        HttpConfigInterceptorProvider,
        NodeGroupIdService
    ]
})
export class TransformTableModule {
}
