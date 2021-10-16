import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalListComponent } from './pages/personal-list/personal-list.component';
import { PersonalItemComponent } from './pages/personal-item/personal-item.component';
import { PersonalLayoutComponent } from './shared/components/personal-layout/personal-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalListComponent,
    PersonalItemComponent,
    PersonalLayoutComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PersonalModule { }
