import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SidebarmanageRoutingModule} from './sidebarmanage-routing.module';
import {SidebarmanageComponent} from './sidebarmanage/sidebarmanage.component';
import {SidebarModule} from '@shared/sidebar/sidebar.module';


@NgModule({
    declarations: [
        SidebarmanageComponent
    ],
    imports: [
        CommonModule,
        SidebarmanageRoutingModule,
        SidebarModule
    ]
})
export class SidebarmanageModule {
}
