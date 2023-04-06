import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { menuItem } from '../../../../_state/menu-item.model';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
  styleUrls: ['./menu-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemListComponent {
  @Input() menuItem: menuItem;

  @Output() onChange = new EventEmitter<menuItem>();
  @Output() deleteMenuItem = new EventEmitter<string>();

  onFavorite(favorite: boolean) {
    this.onChange.emit({ ...this.menuItem, favorite });
  }
}
