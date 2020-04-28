import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChannelsRoutingModule} from './channels-routing.module';
import {ChannelsComponent} from './channels/channels.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {CreateComponent} from './create/create.component';
import {SharedModule} from '@shared/share.module';
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {DataListModule} from "@shared/data-list/data-list.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {DeleteComponent} from './delete/delete.component';
import {ConfirmBoxModule} from "@shared/confirm-box/confirm-box.module";
import {CustomCheckboxModule} from "@shared/custom-checkbox/custom-checkbox.module";

@NgModule({
    declarations: [ChannelsComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        ChannelsRoutingModule,
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
    ]
})
export class ChannelsModule {
}
