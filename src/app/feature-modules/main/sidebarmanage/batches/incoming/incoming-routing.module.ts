import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomingComponent } from './incoming/incoming.component';

const routes: Routes = [
    {
        path : '',
        component : IncomingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingRoutingModule { }
