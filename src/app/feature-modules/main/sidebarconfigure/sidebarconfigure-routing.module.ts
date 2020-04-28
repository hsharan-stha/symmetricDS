import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SidebarconfigureComponent} from "./sidebarconfigure/sidebarconfigure.component";
import {PageTitle} from "@sidebarconfigure/data/page-title.enum";
import {RoleGuard} from "../../../auth/role.guard";
import {API} from "@config/url";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'groups'
    },
    {
        path: '',
        component: SidebarconfigureComponent,
        children: [
            {
                path: 'groups',
                loadChildren: './groups/groups.module#GroupsModule',
                data: {title: PageTitle.GROUP_GET}
            },
            {
                path: 'group-links',
                loadChildren: './group-links/group-links.module#GroupLinksModule',
                data: {title: PageTitle.GROUP_LINKS_GET}
            },
            {
                path: 'channels',
                loadChildren: './channels/channels.module#ChannelsModule',
                data: {title: PageTitle.CHANNELS_GET}
            },
            {
                path: 'routers',
                loadChildren: './routers/routers.module#RoutersModule',
                data: {title: PageTitle.ROUTERS_GET}
            },
            {
                path: 'table-triggers',
                loadChildren: './tabletriggers/tabletriggers.module#TabletriggersModule',
                data: {title: PageTitle.TABLE_TRIGGERS_GET}
            },
            {
                path: 'table-routing',
                loadChildren: './tablerouting/tablerouting.module#TableroutingModule',
                data: {title: PageTitle.TABLE_ROUTING_GET}
            },
            {
                path: 'file-triggers',
                loadChildren: './file-triggers/file-triggers.module#FileTriggersModule',
                data: {title: PageTitle.FILE_TRIGGER_GET}
            },
            {
                path: 'file-routing',
                loadChildren: './file-routing/file-routing.module#FileRoutingModule',
                data: {title: PageTitle.FILE_ROUTING_GET}
            },
            {
                path: 'user',
                loadChildren: './user/user.module#UserModule',
                canActivate: [RoleGuard],
                data: {title: PageTitle.USER_GET, role: API.admin},

            },
            {
                path: 'parameters',
                loadChildren: './parameters/parameters.module#ParametersModule',
                data: {title: PageTitle.PARAMETERS_GET}
            },
            {
                path: 'transform-table',
                loadChildren: './transform-table/transform-table.module#TransformTableModule',
                data: {title: PageTitle.TRANSFORMTABLE_GET}
            },
            {
                path : 'transform-column',
                loadChildren : './transform-column/transform-column.module#TransformColumnModule',
                data : {
                    title : PageTitle.TRANSFORMCOLUMN_GET
                }
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SidebarconfigureRoutingModule {
}
