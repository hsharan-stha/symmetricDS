import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ParametersComponent} from './parameters/parameters.component';

import {CreateComponent} from './create/create.component';
import {PageTitle} from "@sidebarconfigure/parameters/data/page-titlte.enum";
import {RoleGuard} from "../../../../auth/role.guard";
import {API} from "@config/url";


const routes: Routes = [
    {
        path: '',
        component: ParametersComponent,
        children: [
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
export class ParametersRoutingModule {
}
