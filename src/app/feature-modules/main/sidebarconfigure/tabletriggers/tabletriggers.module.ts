import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TabletriggersRoutingModule} from './tabletriggers-routing.module';
import {TabletriggersComponent} from './tabletriggers/tabletriggers.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {SharedModule} from "@shared/share.module";
import {CreateComponent} from './create/create.component';
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {ConfirmBoxModule} from "@shared/confirm-box/confirm-box.module";
import {DataListModule} from "@shared/data-list/data-list.module";
import {MessageboxModule} from "@shared/messagebox/messagebox.module";
import {DeleteComponent} from './delete/delete.component';
import {CustomCheckboxModule} from "@shared/custom-checkbox/custom-checkbox.module";

@NgModule({
    declarations: [TabletriggersComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        TabletriggersRoutingModule,
        BodyTitleModule,
        DialogModule,
        ButtonbarModule,
        TabheadModule,
        SharedModule,
        MatButtonModule,
        PipeModule,
        LoaderModule,
        ConfirmBoxModule,
        DataListModule,
        MessageboxModule,
        CustomCheckboxModule
    ]
})
export class TabletriggersModule {
}
