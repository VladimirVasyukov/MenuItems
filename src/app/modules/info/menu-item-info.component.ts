import { Component, OnInit } from '@angular/core';
import { MenuItemsService } from 'src/app/_state/menu-item.service';
import { ActivatedRoute } from '@angular/router';
import { menuItem } from 'src/app/_state/menu-item.model';

@Component({
  selector: 'app-menu-item-info',
  template: ` <h3>{{ menuItemName }} - {{ menuItemDescription }}</h3>
    <p *ngIf="menuItemFavorite">Вы добавили этот пункт меню в избранное</p>
    <p *ngIf="menuItemId">ID пункта - {{ menuItemId }}</p>`,
})
export class menuItemInfoComponent implements OnInit {
  menuItemId: string;
  menuItem: menuItem;

  constructor(
    private route: ActivatedRoute,
    private service: MenuItemsService
  ) {}

  get menuItemDescription() {
    return this.menuItem?.description;
  }

  get menuItemName() {
    return this.menuItem?.name;
  }

  get menuItemFavorite() {
    return this.menuItem?.favorite;
  }

  ngOnInit() {
    this.menuItemId = this.route.snapshot.params['id'];
    this.service
      .getMenuItemById(this.menuItemId)
      .subscribe((menuItem) => (this.menuItem = menuItem));
  }
}
