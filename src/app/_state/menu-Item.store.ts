import { Injectable } from '@angular/core';

import { EntityState, StoreConfig, EntityStore } from '@datorama/akita';

import { menuItem } from './menu-item.model';

export interface MenuItemState extends EntityState<menuItem, string> {}

export function createInitialState(): MenuItemState {
  return {};
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'session' })
export class MenuItemStore extends EntityStore<MenuItemState> {
  constructor() {
    super(createInitialState());
  }
}
