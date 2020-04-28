import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InstalledTriggerComponent} from "@sidebarmanage/installed-trigger/installed-trigger/installed-trigger.component";

const routes: Routes = [
    {
        path: '',
        component: InstalledTriggerComponent
    }

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstalledTriggerRoutingModule {
}
