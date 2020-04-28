import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NodesComponent} from "@sidebarmanage/nodes/nodes/nodes.component";
import {PageTitle} from "@sidebarmanage/nodes/data/page_tile.enum";
import {DataLoadDialogComponent} from "@sidebarmanage/nodes/data-load-dialog/data-load-dialog.component";
import {RoleGuard} from "../../../../auth/role.guard";
import {API} from "@config/url";

const routes: Routes = [
    {
        path: '',
        component: NodesComponent,
        children: [
            {
                path: 'data-load',
                component: DataLoadDialogComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.DATA_LOAD, role: API.admin, role2: API.write, role3: API.writeDelete},
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NodesRoutingModule {
}
