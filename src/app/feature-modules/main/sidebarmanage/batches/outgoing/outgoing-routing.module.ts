import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutgoingComponent } from './outgoing/outgoing.component';

const routes: Routes = [
    {
        path : '',
        component : OutgoingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutgoingRoutingModule { }
