import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AddEditContentComponent } from './components/content-table/add-edit-content/add-edit-content.component';
import { ContentTableComponent } from './components/content-table/content-table.component';
import { DeleteComponent } from './components/delete/delete.component';
import { AddEditGenreComponent } from './components/genre-table/add-edit-genre/add-edit-genre.component';
import { GenreTableComponent } from './components/genre-table/genre-table.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { AddEditUserComponent } from './components/user-table/add-edit-user/add-edit-user.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { NetLoaderComponent } from "../components/net-loader/net-loader.component";

@NgModule({
    declarations: [
        AdminHomeComponent,
        GenreTableComponent,
        AddEditGenreComponent,
        DeleteComponent,
        UserTableComponent,
        AddEditUserComponent,
        ContentTableComponent,
        AddEditContentComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FooterComponent,
        HomeCardComponent,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NetLoaderComponent
    ]
})

export class AdminModule { }
