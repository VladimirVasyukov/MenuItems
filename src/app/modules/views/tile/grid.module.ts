import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MenuItemsComponent } from '../../menu-items/menu-items.component';
import { FavoriteModule } from '../../favorite/favorite.module';
import { MenuItemsGridComponent } from './menu-items-grid/menu-items-grid.component';
import { MenuItemGridComponent } from './menu-item-grid/menu-item-grid.component';

const routes: Routes = [
  {
    path: '',
    component: MenuItemsComponent,
    children: [{ path: '', component: MenuItemsGridComponent }],
  },
];

@NgModule({
  declarations: [MenuItemsGridComponent, MenuItemGridComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FavoriteModule],
  exports: [RouterModule, MenuItemsGridComponent, MenuItemGridComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GridModule {}
