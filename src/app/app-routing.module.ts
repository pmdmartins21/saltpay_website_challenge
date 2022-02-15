import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { Top100Component } from './components/top100/top100.component';

const routes: Routes = [
  { path: '', component:HomeComponent}, 
  { path: 'top100', component:Top100Component}, 
  { path: 'details/:id', component:DetailsComponent},
  { path: 'favorites', component:FavoritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
