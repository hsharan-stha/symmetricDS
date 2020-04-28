import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SidebarmanageComponent} from "./sidebarmanage/sidebarmanage.component";
import {PageTitle} from "@sidebarmanage/data/page-title.enum";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'nodes'
    },
    {
        path: '',
        component: SidebarmanageComponent,
        children: [
            {
                path: 'nodes',
                loadChildren: './nodes/nodes.module#NodesModule',
                data: {title: PageTitle.NODES_GET},
            },
            {
                path: 'installed-trigger',
                loadChildren: './installed-trigger/installed-trigger.module#InstalledTriggerModule',
                data: {title: PageTitle.INSTALLED_TRIGGER_LIST},
            },

            {
                path: 'outgoing-batches',
                loadChildren: './batches/outgoing/outgoing.module#OutgoingModule',
                data: {title: PageTitle.OUTGOING_BACTHES_LIST},
            }
            ,{
                path: 'incoming-batches',
                loadChildren: './batches/incoming/incoming.module#IncomingModule',
                data: {title: PageTitle.INCOMING_BACTHES_LIST},
            },

            {
                path: 'logging',
                loadChildren: './logging/logging.module#LoggingModule',
                data: {title: PageTitle.LOGGING_LIST},
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SidebarmanageRoutingModule {
}
