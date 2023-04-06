import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { QueryEntity } from '@datorama/akita';

import { MenuItemState, MenuItemStore } from './menu-Item.store';
import { menuItem } from './menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuItemQuery extends QueryEntity<MenuItemState> {
  selectAllMenuItems$: Observable<menuItem[]> = this.selectAll();

  constructor(protected override store: MenuItemStore) {
    super(store);
  }
}
