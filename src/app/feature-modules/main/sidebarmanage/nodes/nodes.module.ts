import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NodesRoutingModule} from './nodes-routing.module';
import {NodesComponent} from './nodes/nodes.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {SharedModule} from "@shared/share.module";
import {SearchboxModule} from "@shared/searchbox/searchbox.module";
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {DataListModule} from "@shared/data-list/data-list.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {NodesService} from "@sidebarmanage/nodes/services/nodes.service";
import {NodesAdapter} from "@sidebarmanage/nodes/adapter/nodes.adapter";
import {NodeButtonBarComponent} from './node-button-bar/node-button-bar.component';
import {DataLoadDialogComponent} from './data-load-dialog/data-load-dialog.component';
import {DataLoadStepOneComponent} from './data-load-steps/data-load-step-one/data-load-step-one.component';
import {DataLoadStepTwoComponent} from './data-load-steps/data-load-step-two/data-load-step-two.component';
import {NodeIdentityService} from "@sidebarmanage/nodes/services/nodes-identity.service";
import {NodeIdentityAdapter} from "@sidebarmanage/nodes/adapter/nodes-identity.adapter";
import {DataLoadStepTwoOfTwoComponent} from './data-load-steps/data-load-step-two-of-two/data-load-step-two-of-two.component';
import {StepTwoNotifyService} from "@sidebarmanage/nodes/services/step-two-notify.service";
import {TableReloadRequestService} from "@sidebarmanage/nodes/services/table-reload-request.service";
import {TableReloadRequestAdapter} from "@sidebarmanage/nodes/adapter/table-reload-request.adapter";
import {DataLoadStepThreeComponent} from './data-load-steps/data-load-step-three/data-load-step-three.component';
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";
import {  NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        NodesComponent,
        NodeButtonBarComponent,
        DataLoadDialogComponent,
        DataLoadStepOneComponent,
        DataLoadStepTwoComponent,
        DataLoadStepTwoOfTwoComponent,
        DataLoadStepThreeComponent
    ],
    imports:
        [
            CommonModule,
            NodesRoutingModule,
            BodyTitleModule,
            SharedModule,
            SearchboxModule,
            MatButtonModule,
            PipeModule,
            DataListModule,
            LoaderModule,
            NgbDropdownModule
        ],
    providers: [
        HttpConfigInterceptorProvider,
        NodesService,
        NodesAdapter,
        NodeIdentityService,
        NodeIdentityAdapter,
        StepTwoNotifyService,
        TableReloadRequestService,
        TableReloadRequestAdapter
    ]
})
export class NodesModule {
}
