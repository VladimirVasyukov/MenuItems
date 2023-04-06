import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { menuItem } from '../../../../_state/menu-item.model';

@Component({
  selector: 'app-menu-item-grid',
  templateUrl: './menu-item-grid.component.html',
  styleUrls: ['./menu-item-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemGridComponent {
  @Input() menuItem: menuItem;

  @Output() onChange = new EventEmitter<menuItem>();
  @Output() deleteMenuItem = new EventEmitter<string>();

  onFavorite(favorite: boolean) {
    this.onChange.emit({ ...this.menuItem, favorite });
  }
}
