import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransformTableComponent} from "@sidebarconfigure/transform-table/transform-table/transform-table.component";
import {RoleGuard} from "../../../../auth/role.guard";
import {API} from "@config/url";
import {CreateComponent} from "@sidebarconfigure/transform-table/create/create.component";
import {DeleteComponent} from "@sidebarconfigure/transform-table/delete/delete.component";
import {PageTitle} from "@sidebarconfigure/transform-table/data/page-title.enum";

const routes: Routes = [
    {
        path: '',
        component: TransformTableComponent,
        children: [
            {
                path: 'create',
                component: CreateComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.CREATE, role: API.admin, role2: API.write, role3: API.writeDelete}
            },
            {
                path: ':id/delete',
                component: DeleteComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.DELETE, role: API.admin, role3: API.writeDelete}
            },
            {
                path: ':id/edit',
                component: CreateComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.EDIT, role: API.admin, role2: API.write, role3: API.writeDelete}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransformTableRoutingModule {
}
