import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from "./user/user.component";

import {CreateComponent} from './create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {PageTitle} from "@sidebarconfigure/user/data/page-title.enum";
import {RoleGuard} from "../../../../auth/role.guard";
import {API} from "@config/url";

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'create',
                component: CreateComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.CREATE, role: API.admin}
            },

            {
                path: ':id/delete',
                component: DeleteComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.DELETE, role: API.admin}
            },

            {
                path: ':id/edit',
                component: CreateComponent,
                canActivate: [RoleGuard],
                data: {title: PageTitle.EDIT, role: API.admin}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
