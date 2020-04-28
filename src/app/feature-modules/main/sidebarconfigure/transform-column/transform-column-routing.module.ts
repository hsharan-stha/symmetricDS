import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TransformColumnComponent} from './transform-column/transform-column.component';
import {CreateComponent} from './create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {PageTitle} from './data/page-title.enum';
import {RoleGuard} from "../../../../auth/role.guard";
import {API} from "@config/url";

const routes: Routes = [
    {
        path: '',
        component: TransformColumnComponent,
        children: [
            {
                path: 'create',
                component: CreateComponent,
                canActivate: [RoleGuard],
                data: {
                    title: PageTitle.CREATE,
                    role: API.admin,
                    role2: API.write,
                    role3: API.writeDelete
                }
            },
            {
                path: ":id/delete",
                component: DeleteComponent,
                canActivate: [RoleGuard],
                data: {
                    title: PageTitle.DELETE,
                    role: API.admin,
                    role3: API.writeDelete
                }
            },

            {
                path: ":id/edit",
                component: CreateComponent,
                canActivate: [RoleGuard],
                data: {
                    title: PageTitle.UPDATE,
                    role: API.admin,
                    role2: API.write,
                    role3: API.writeDelete
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransformColumnRoutingModule {
}
