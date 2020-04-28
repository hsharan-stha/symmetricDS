import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material";
import {MainRoutingModule} from './main-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TopbarComponent} from './topbar/topbar.component';
import {LogoModule} from "@shared/logo/logo.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {SharedModule} from "@shared/share.module";


import {UnifunDropdownModule} from "@shared/unifun-dropdown/unifun-dropdown.module";
import {ChannelService} from "@sidebarconfigure/channels/services/channel.service";
import {ChannelAdapter} from "@sidebarconfigure/channels/adapter/channel.adapter";
import {ChannelDropdownAdapter} from "@sidebarconfigure/channels/adapter/channel-dropdown.adapter";
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";
import {TableTriggersService} from "@sidebarconfigure/tabletriggers/services/table-triggers.service";
import {TableTriggerAdapter} from "@sidebarconfigure/tabletriggers/adapter/tabletiggers.adapter";
import {TableTriggerDropdownAdapter} from "@sidebarconfigure/tabletriggers/adapter/tabletrigger-dropdown.adapter";
import {SourceTablesNameService} from "@sidebarconfigure/tabletriggers/services/source-tables-name.service";
import {SourceTablesNamesAdapter} from "@sidebarconfigure/tabletriggers/adapter/source-tables-names.adapter";
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {TopbarService} from "./topbar/service/topbar.service";
import {TopbarNotificationAdapter} from "./topbar/adapter/notification.adapter";
import { ShowMessagesComponent } from './topbar/show-messages/show-messages.component';
import {LoaderModule} from "@shared/loader/loader.module";

@NgModule({
    declarations: [
        DashboardComponent,
        TopbarComponent,
        ShowMessagesComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        LogoModule,
        DialogModule,
        SharedModule,
        MatButtonModule,
        UnifunDropdownModule,
        NgbDropdownModule,
        LoaderModule
    ],

    providers: [
        TopbarService,
        TopbarNotificationAdapter,

        ChannelService,
        ChannelAdapter,
        ChannelDropdownAdapter,

        TableTriggersService,
        TableTriggerAdapter,
        TableTriggerDropdownAdapter,

        SourceTablesNameService,
        SourceTablesNamesAdapter,

        HttpConfigInterceptorProvider
    ]

})
export class MainModule {
}
