import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FileTriggersRoutingModule} from './file-triggers-routing.module';
import {FileTriggersComponent} from './file-triggers/file-triggers.component';
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
import {FileTriggersService} from "./services/file-triggers.service";
import {FileTriggersAdapter} from "./adapter/file-triggers.adapter";
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
    declarations: [FileTriggersComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        FileTriggersRoutingModule,
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
export class FileTriggersModule {
}
