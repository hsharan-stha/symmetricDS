import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './../auth/auth.guard';
import {LoginGuard} from './../auth/login.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: '../feature-modules/entry/entry.module#EntryModule',
        canActivate: [LoginGuard],
    },
    {
        path: 'main',
        loadChildren: '../feature-modules/main/main.module#MainModule',
        canLoad: [AuthGuard]
    }
];


@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
