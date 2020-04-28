import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {SidebarconfigureRoutingModule} from './sidebarconfigure-routing.module';
import {SidebarconfigureComponent} from './sidebarconfigure/sidebarconfigure.component';
import {SidebarModule} from '@shared/sidebar/sidebar.module';

//import {GroupService} from "./groups/service/group.service";
import {GroupLinksService} from './group-links/services/group-links.service';
import {GroupLinksAdapter} from './group-links/adapter/group-links.adapter';

import {HttpConfigInterceptorProvider} from '@core/httpconfig.interceptor';

import {SharedModule} from "@shared/share.module";
import {ChannelService} from "./channels/services/channel.service";
import {ChannelAdapter} from "./channels/adapter/channel.adapter";
import {TableTriggersService} from "./tabletriggers/services/table-triggers.service";
import {TableTriggerAdapter} from "./tabletriggers/adapter/tabletiggers.adapter";
import {RoutersService} from "./routers/services/routers.service";
import {RoutersAdapter} from "./routers/adapter/routers.adapter";
import {ChannelDropdownAdapter} from "./channels/adapter/channel-dropdown.adapter";
import {TableTriggerDropdownAdapter} from "./tabletriggers/adapter/tabletrigger-dropdown.adapter";
import {RouterTypeAdapter} from "./routers/adapter/router-type.adapter";
import {FileTriggersService} from "./file-triggers/services/file-triggers.service";
import {FileTriggersAdapter} from "./file-triggers/adapter/file-triggers.adapter";
import {FileTriggersDropdownAdapter} from "./file-triggers/adapter/file-trigger-dropdown.adapter";
import {SourceTablesNameService} from "@sidebarconfigure/tabletriggers/services/source-tables-name.service";
import {SourceTablesNamesAdapter} from "@sidebarconfigure/tabletriggers/adapter/source-tables-names.adapter";
import {TransformTableService} from "@sidebarconfigure/transform-table/service/transform-table.service";
import {TransformTableAdapter} from "@sidebarconfigure/transform-table/adapter/transform-table.adapter";

@NgModule({
    declarations: [SidebarconfigureComponent],
    imports: [
        CommonModule,
        SharedModule,
        SidebarconfigureRoutingModule,
        MatButtonModule,
        SidebarModule,
    ],

    providers: [
        GroupLinksService,
        GroupLinksAdapter,

        RoutersService,
        RoutersAdapter,
        RouterTypeAdapter,

        TransformTableService,
        TransformTableAdapter,

        FileTriggersService,
        FileTriggersAdapter,
        FileTriggersDropdownAdapter,

        HttpConfigInterceptorProvider, //on commenting this it will get issue in file trigger
    ]
})
export class SidebarconfigureModule {
}
