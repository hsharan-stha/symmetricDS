import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BodyTitleModule} from '@shared/body-title/body-title.module';
import {GroupLinksRoutingModule} from './group-links-routing.module';
import {GroupLinksComponent} from './group-links/group-links.component';
import {CreateComponent} from './create/create.component';
import {SearchboxModule} from '@shared/searchbox/searchbox.module';
import {MatButtonModule} from "@angular/material";
import {SharedModule} from "@shared/share.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {CustomCheckboxModule} from '@shared/custom-checkbox/custom-checkbox.module';

import {ButtonbarModule} from "../buttonbar/buttonbar.module";

import {NodeGroupIdService} from './services/node-group-id.service';
import {NodeGroupIdAdapter} from './adapter/node-group-id.adapter';
import {LinkAdapter} from './adapter/link.adapter';
import {LinkService} from './services/link.service';

import {ConfirmBoxModule} from '@shared/confirm-box/confirm-box.module';
import {DeleteComponent} from './delete/delete.component'
import {LoaderModule} from "@shared/loader/loader.module";
import {DataListModule} from '@shared/data-list/data-list.module';

import {HttpConfigInterceptorProvider} from '@core/httpconfig.interceptor';
import {MessageboxModule} from "@shared/messagebox/messagebox.module";

@NgModule({
    declarations: [
        GroupLinksComponent,
        CreateComponent,
        DeleteComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        GroupLinksRoutingModule,
        MatButtonModule,
        BodyTitleModule,
        ButtonbarModule,
        SearchboxModule,
        DialogModule,
        TabheadModule,
        DataListModule,
        CustomCheckboxModule,
        ConfirmBoxModule,
        LoaderModule,
        MessageboxModule,

    ],

    providers: [
        LinkService,
        LinkAdapter,

        NodeGroupIdAdapter,
        NodeGroupIdService,
        HttpConfigInterceptorProvider
    ],
})
export class GroupLinksModule {
}
