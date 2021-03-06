import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakingBadApiRoutingModule } from './breaking-bad-api-routing.module';
import { SearchCharactersComponent } from './pages/search-characters/search-characters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/shared.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [SearchCharactersComponent, CardComponent, SearchFormComponent, SearchFormComponent, HomeComponent],
  imports: [
    CommonModule,
    BreakingBadApiRoutingModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    SharedModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    AccordionModule
  ]
})

export class BreakingBadApiModule { }
