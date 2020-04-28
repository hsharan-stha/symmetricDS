import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggingComponent } from './logging/logging.component';

const routes: Routes = [
    {
        path : '',
        component : LoggingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggingRoutingModule { }
