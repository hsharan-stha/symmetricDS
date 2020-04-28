import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransformColumnRoutingModule } from './transform-column-routing.module';
import { TransformColumnComponent } from './transform-column/transform-column.component';
import { SharedModule } from '@shared/share.module';
import { MatButtonModule } from '@angular/material';
import { BodyTitleModule } from '@shared/body-title/body-title.module';
import { ButtonbarModule } from '@sidebarconfigure/buttonbar/buttonbar.module';
import { SearchboxModule } from '@shared/searchbox/searchbox.module';
import { TabheadModule } from '@sidebarconfigure/tabhead/tabhead.module';
import { DataListModule } from '@shared/data-list/data-list.module';
import { LoaderModule } from '@shared/loader/loader.module';
import { ConfirmBoxModule } from '@shared/confirm-box/confirm-box.module';
import { TransformTypeService } from './services/transform-type.service';
import { SelectWithLoadingModule } from '@shared/select-with-loading/select-with-loading.module';
import { TranformColumnService } from './services/tranform-column.service'; 
import { TransformColumnAdapter } from './adapter/transform-column.adapter';
import { HttpConfigInterceptorProvider } from '@core/httpconfig.interceptor';
import { TransformTypeAdapter } from './adapter/transform-type.adapter';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { DialogModule } from '@shared/dialog/dialog.module';
import { CustomCheckboxModule } from '@shared/custom-checkbox/custom-checkbox.module';
 
@NgModule({
    declarations: [
        TransformColumnComponent,
        DeleteComponent,
        CreateComponent
    ],
    imports: [
        CommonModule,
        TransformColumnRoutingModule,

        SharedModule,
        
        MatButtonModule,
        BodyTitleModule,
        ButtonbarModule,
        SearchboxModule,
        DialogModule,
        TabheadModule,
        DataListModule,
        CustomCheckboxModule,
        ConfirmBoxModule,
        LoaderModule,
        SelectWithLoadingModule
     
    ],
    providers : [
        HttpConfigInterceptorProvider,
        TransformTypeAdapter,
        TransformTypeService,

        TranformColumnService,
        TransformColumnAdapter,

    ]
})
export class TransformColumnModule { }
