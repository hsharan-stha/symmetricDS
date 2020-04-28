import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/share.module';
import {EntryRoutingModule} from './entry-routing.module';
import {LoginComponent} from './login/login.component';
import {LogoModule} from '@shared/logo/logo.module';
import {NodeService} from './services/node.service';
import {LoginService} from './services/login.service';
import {LoaderModule} from "@shared/loader/loader.module";


import {NodeAdapter} from './adapter/node.adapter';
import {HttpConfigInterceptorProvider} from "@core/httpconfig.interceptor";
import { SelectWithLoadingModule } from '@shared/select-with-loading/select-with-loading.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        EntryRoutingModule,
        SharedModule,
        LogoModule,
        LoaderModule,
        SelectWithLoadingModule
    ],
    providers: [
        HttpConfigInterceptorProvider,
        NodeAdapter,
        NodeService,
        LoginService
    ],
})
export class EntryModule {
}
