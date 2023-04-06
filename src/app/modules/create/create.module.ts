import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuItemAddComponent } from './menu-item-create.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

const routes: Routes = [
  {
    path: '',
    component: MenuItemsComponent,
    children: [{ path: '', component: MenuItemAddComponent }],
  },
];

@NgModule({
  declarations: [MenuItemAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, MenuItemAddComponent],
})
export class MenuItemCreateModule {}
