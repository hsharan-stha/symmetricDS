import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path : '',
        component : DashboardComponent,
        children : [
            {
                path: '',
                redirectTo:'manage'
            },
            {
                path: 'manage',
                loadChildren: './sidebarmanage/sidebarmanage.module#SidebarmanageModule'
            },
            {
                path: 'configure',
                loadChildren: './sidebarconfigure/sidebarconfigure.module#SidebarconfigureModule'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
