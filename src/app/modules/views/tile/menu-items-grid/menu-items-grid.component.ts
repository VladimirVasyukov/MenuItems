import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs';

import { MenuItemsService } from '../../../../_state/menu-item.service';
import { MenuItemQuery } from '../../../../_state/menu-item.query';
import { menuItem } from '../../../../_state/menu-item.model';

@Component({
  selector: 'app-menu-items-grid',
  template: `
    <ul class="grid-view">
      <app-menu-item-grid
        *ngFor="let menuItem of menuItems$ | async"
        [menuItem]="menuItem"
        (onChange)="addMenuItemToFavorites($event)"
        (deleteMenuItem)="deleteMenuItem($event)"
      >
      </app-menu-item-grid>
    </ul>
  `,
  styles: [
    `
      .grid-view {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsGridComponent implements OnInit {
  readonly menuItems$: Observable<menuItem[]> = this.query.selectAllMenuItems$;

  constructor(
    private service: MenuItemsService,
    private query: MenuItemQuery
  ) {}

  ngOnInit() {
    this.service.initMenuItems().subscribe();
  }

  addMenuItemToFavorites(menuItem: menuItem) {
    this.service.addMenuItemToFavorites(menuItem).subscribe();
  }

  deleteMenuItem(id: string) {
    this.service.deleteMenuItem(id).subscribe();
  }
}
