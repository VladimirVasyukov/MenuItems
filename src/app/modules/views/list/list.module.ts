import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MenuItemsComponent } from '../../menu-items/menu-items.component';
import { FavoriteModule } from '../../favorite/favorite.module';
import { MenuItemInfoModule } from '../../info/info.module';
import { MenuItemsListComponent } from './menu-items-list/menu-items-list.component';
import { MenuItemListComponent } from './menu-item-list/menu-item-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuItemsComponent,
    children: [{ path: '', component: MenuItemsListComponent }],
  },
];

@NgModule({
  declarations: [MenuItemsListComponent, MenuItemListComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FavoriteModule],
  exports: [RouterModule, MenuItemsListComponent, MenuItemListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListModule {}
