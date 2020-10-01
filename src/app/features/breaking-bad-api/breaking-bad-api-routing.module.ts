import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCharactersComponent } from './pages/search-characters/search-characters.component';
import { HomeComponent } from './pages/home/home.component';
import { Allroutes } from '../../core/enums/allroutes.enum';

const routes: Routes = [
  {
    path: Allroutes.HOME,
    component: HomeComponent
  },
  {
    path: Allroutes.SEARCHCHARACTERS,
    component: SearchCharactersComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BreakingBadApiRoutingModule { }
