import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';

import {HttpConfigInterceptorProvider} from './core/httpconfig.interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AlertMessageComponent} from './alert-message/alert-message.component';
import {TitleService} from "@shared/services/title.service";
import {ServerNameService} from "@shared/services/server-name.service";
import {AuthService} from "@shared/services/auth.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        AlertMessageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        TitleService,
        ServerNameService,
        AuthService,
        HttpConfigInterceptorProvider
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        AlertMessageComponent
    ]
})
export class AppModule {
}
