import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HttpConfigInterceptorProvider} from '@core/httpconfig.interceptor';


import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user/user.component';
import {CreateComponent} from './create/create.component';
import {BodyTitleModule} from "@shared/body-title/body-title.module";
import {DialogModule} from "@shared/dialog/dialog.module";
import {ButtonbarModule} from "../buttonbar/buttonbar.module";
import {TabheadModule} from "../tabhead/tabhead.module";
import {SharedModule} from "@shared/share.module";
import {MatButtonModule} from "@angular/material";
import {PipeModule} from "@shared/pipe/pipe.module";
import {LoaderModule} from "@shared/loader/loader.module";
import {DataListModule} from '@shared/data-list/data-list.module';
import {ConfirmBoxModule} from '@shared/confirm-box/confirm-box.module';

import { DeleteComponent } from './delete/delete.component';


import { UserService } from './services/user.service';
import { UserAdapter } from './adapter/user.adapter';
import { RoleService } from './services/role.service';
import { RoleAdapter } from './adapter/role.adapter';

@NgModule({
    declarations: [UserComponent, CreateComponent, DeleteComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        BodyTitleModule,
        DialogModule,
        ButtonbarModule,
        TabheadModule,
        SharedModule,
        MatButtonModule,
        PipeModule,
        DataListModule,
        LoaderModule,
        ConfirmBoxModule
    ],

    providers : [
        HttpConfigInterceptorProvider,
        UserAdapter,
        UserService,
        RoleAdapter,
        RoleService
    ]
})
export class UserModule {
}
