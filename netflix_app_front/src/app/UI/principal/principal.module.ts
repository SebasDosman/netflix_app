import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { HomepageComponent } from './wait/homepage.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { ContentComponent } from './components/content/content.component';
import { PrincipalComponentComponent } from './layout/principal-component/principal-component.component';
import { SecondaryComponentComponent } from './layout/secondary-component/secondary-component.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SeriesComponent } from './pages/series/series.component';
import { FilmsComponent } from './pages/films/films.component';
import { NewComponent } from './pages/new/new.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { NetLoaderComponent } from '../components/net-loader/net-loader.component';
import { HeaderTrailerComponent } from './components/header-trailer/header-trailer.component';
import { ListDataPrincipalComponent } from './components/list-data-principal/list-data-principal.component';
import { TrailerReprComponent } from './components/trailer-repr/trailer-repr.component';
import { PrincipalModalComponent } from './components/principal-modal/principal-modal.component';
import { TrailerPreviewComponent } from './components/trailer-preview/trailer-preview.component';
import { InfoSecundarioDataComponent } from './components/info-secundario-data/info-secundario-data.component';
import { InfoPrincipalDataComponent } from './components/info-principal-data/info-principal-data.component';
import { SearchQueryComponent } from './pages/search-query/search-query.component';
import { CarrouselDataComponent } from './components/carrousel-data/carrousel-data.component';
import { FormsModule } from '@angular/forms';
import { SecondsToHourPipe } from '../pipes/seconds-to-hour.pipe';



@NgModule({
  declarations: [
    HomepageComponent,
    PrincipalComponentComponent,
    SecondaryComponentComponent,
    ContentListComponent,
    ContentComponent,
    HomeComponent,
    SeriesComponent,
    FilmsComponent,
    NewComponent,
    MyListComponent,
    HeaderTrailerComponent,
    ListDataPrincipalComponent,
    TrailerReprComponent,
    PrincipalModalComponent,
    TrailerPreviewComponent,
    InfoSecundarioDataComponent,
    InfoPrincipalDataComponent,
    SearchQueryComponent,
    CarrouselDataComponent,
    SecondsToHourPipe
  ],
  imports: [
    CommonModule          ,
    PrincipalRoutingModule,
    NavbarComponent       ,
    FooterComponent       ,
    NetLoaderComponent    ,
    FormsModule           
  ]
})

export class PrincipalModule {}