import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { MenuItemsComponent } from './menu-items.component';

const ListOrGridTitle = { title: 'Меню' };
const CreateTitle = { title: 'Создание пункта меню' };
const InfoTitle = { title: 'Информация о пункте' };
const EditTitle = { title: 'Редактирование пункта' };

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    data: ListOrGridTitle,
    loadChildren: () =>
      import('../views/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'tile',
    data: ListOrGridTitle,
    loadChildren: () =>
      import('../views/tile/grid.module').then((m) => m.GridModule),
  },
  {
    path: 'create',
    data: CreateTitle,
    loadChildren: () =>
      import('../create/create.module').then((m) => m.MenuItemCreateModule),
  },
  {
    path: 'info/:id',
    data: InfoTitle,
    loadChildren: () =>
      import('../info/info.module').then((m) => m.MenuItemInfoModule),
  },
  {
    path: 'edit/:id',
    data: EditTitle,
    loadChildren: () =>
      import('../create/create.module').then((m) => m.MenuItemCreateModule),
  },
];

@NgModule({
  declarations: [MenuItemsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MenuItemsModule {}
