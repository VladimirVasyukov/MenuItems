import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { menuItemInfoComponent } from './menu-item-info.component';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

const routes: Routes = [
  {
    path: '',
    component: MenuItemsComponent,
    children: [{ path: '', component: menuItemInfoComponent }],
  },
];

@NgModule({
  declarations: [menuItemInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, menuItemInfoComponent],
})
export class MenuItemInfoModule {}
