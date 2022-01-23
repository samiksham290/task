import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { Profile1Component } from './profile1/profile1.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';




const routes: Routes = [

  {
path: "profile",
component : Profile1Component

  },
  {
    path:"",
    component:ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent,
    Profile1Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,

    MatGridListModule,
    MatMenuModule,
  ]
})
export class ProfileModule { }
