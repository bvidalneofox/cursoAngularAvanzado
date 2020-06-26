import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NoPageFoundComponent,
        ModalUploadComponent
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NoPageFoundComponent,
        ModalUploadComponent
        ],
    providers: [],
})
export class SharedModule { }
