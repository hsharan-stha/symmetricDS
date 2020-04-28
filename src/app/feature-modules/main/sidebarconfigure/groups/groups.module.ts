import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupsRoutingModule} from './groups-routing.module';
import {GroupsComponent} from './groups/groups.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {SharedModule} from '@shared/share.module';
import {PipeModule} from "@shared/pipe/pipe.module";
import {MatButtonModule} from "@angular/material";
import {CreateComponent} from './create/create.component';
import {GroupService} from "./service/group.service";
import {LoaderModule} from "@shared/loader/loader.module";
import {ConfirmBoxModule} from "@shared/confirm-box/confirm-box.module";
import {DeleteComponent} from './delete/delete.component';
import {DataListModule} from "@shared/data-list/data-list.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {GroupAdapter} from "./adapter/group.adapter";
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";

@NgModule({
    declarations: [
        GroupsComponent,
        CreateComponent,
        DeleteComponent,
    ],
    imports: [
        CommonModule,
        GroupsRoutingModule,
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
        MessageboxModule
    ],
    providers: [
        HttpConfigInterceptorProvider,
        GroupService,
        GroupAdapter
    ],
})
export class GroupsModule {
}