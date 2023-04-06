import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteComponent } from './menu-item-favorite.component';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule],
  exports: [FavoriteComponent],
})
export class FavoriteModule {}
