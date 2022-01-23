import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';


const routes:Routes=[
  {
    path:'view',
    component:ViewInventoryComponent
  },
]

@NgModule({
  declarations: [
    ViewInventoryComponent,
    AddInventoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatGridListModule,
    MatMenuModule,
    
  ]
})
export class InventoryModule { }
