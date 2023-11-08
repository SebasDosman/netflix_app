import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmsComponent } from './pages/films/films.component';
import { MyListComponent } from './pages/my-list/my-list.component';
import { NewComponent } from './pages/new/new.component';
import { SeriesComponent } from './pages/series/series.component';
import { HomeComponent } from './pages/home/home.component';
import { TrailerReprComponent } from './components/trailer-repr/trailer-repr.component';
import { SearchQueryComponent } from './pages/search-query/search-query.component';
import { loginGuard } from 'src/app/guards/login-guard';



const routes: Routes = [
  { path: 'home'        , component: HomeComponent        , canActivate: [loginGuard]},
  { path: 'films'       , component: FilmsComponent       , canActivate: [loginGuard]},
  { path: 'my-list'     , component: MyListComponent      , canActivate: [loginGuard]},
  { path: 'new'         , component: NewComponent         , canActivate: [loginGuard]},
  { path: 'series'      , component: SeriesComponent      , canActivate: [loginGuard]},
  { path: 'trailer/:id' , component: TrailerReprComponent , canActivate: [loginGuard]},
  { path: 'search/:query', component: SearchQueryComponent, canActivate: [loginGuard]},
  { path: '**'          , redirectTo: 'home'              }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PrincipalRoutingModule { }