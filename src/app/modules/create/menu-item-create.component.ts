import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';

import { Subscription, tap } from 'rxjs';

import { MenuItemsService } from '../../_state/menu-item.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './menu-item-create.component.html',
  styleUrls: ['./menu-item-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemAddComponent implements OnInit {
  readonly MENU_ITEM_NAME_INPUT_WARN_MESSAGE: string =
    'Поле "Название пункта" не может быть пустым. Введите название пункта';
  readonly MENU_ITEM_DESCRIPTION_INPUT_WARN_MESSAGE: string =
    'Поле "Описание пункта" не может быть пустым. Введите описание пункта';
  readonly MENU_ITEM_IMAGE_INPUT_WARN_MESSAGE: string =
    'Поле "Ссылка на картинку" не может быть пустым. Добавьте ссылку на картинку';
  readonly TITLE: string = 'Создание пункта';
  readonly CREATE: string = 'Создать';
  readonly SAVE: string = 'Сохранить';

  menuItemId: string;
  title: Data;
  subscriptionTitle$: Subscription;

  form: FormGroup = new FormGroup({
    menuItemName: new FormControl('', Validators.required),
    menuItemDescription: new FormControl('', Validators.required),
    menuItemImage: new FormControl('', Validators.required),
  });

  constructor(
    private service: MenuItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get menuItemNameValidation(): boolean {
    return (this.form.get('menuItemName')?.invalid &&
      this.form.get('menuItemName')?.touched) as boolean;
  }

  get menuItemNameValidationMessage(): boolean {
    return this.form.get('menuItemName')?.errors?.['required'] as boolean;
  }

  get menuItemDescriptionValidation(): boolean {
    return (this.form.get('menuItemDescription')?.invalid &&
      this.form.get('menuItemDescription')?.touched) as boolean;
  }

  get menuItemDescriptionValidationMessage(): boolean {
    return this.form.get('menuItemDescription')?.errors?.[
      'required'
    ] as boolean;
  }

  get menuItemImageValidation(): boolean {
    return (this.form.get('menuItemImage')?.invalid &&
      this.form.get('menuItemImage')?.touched) as boolean;
  }

  get menuItemImageValidationMessage(): boolean {
    return this.form.get('menuItemImage')?.errors?.['required'] as boolean;
  }

  ngOnInit(): void {
    this.subscriptionTitle$ = this.activatedRoute.data
      .pipe(
        tap((data) => {
          this.title = data;
        })
      )
      .subscribe();

    this.menuItemId = this.route.snapshot.params['id'];
    if (this.menuItemId) {
      this.service
        .getMenuItemById(this.menuItemId)
        .pipe(
          tap((menuItem) => {
            if (menuItem) {
              this.form.patchValue({
                menuItemName: menuItem.name,
                menuItemDescription: menuItem.description,
                menuItemImage: menuItem.image,
              });
            }
          })
        )
        .subscribe();
    }
  }

  addMenuItem() {
    const newMenuItem = {
      name: this.form.value.menuItemName,
      description: this.form.value.menuItemDescription,
      image: this.form.value.menuItemImage,
    };
    this.service
      .addMenuItem(newMenuItem, this.menuItemId)
      .pipe(
        tap(() => {
          this.form.reset();
          this.router.navigate(['/list']);
        })
      )
      .subscribe();
  }
}
