import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';

import { guid } from '@datorama/akita';

import { MenuItemStore } from './menu-Item.store';
import { menuItem, MenuItemForm } from './menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuItemsService {
  constructor(
    private menuItemsStore: MenuItemStore,
    private http: HttpClient
  ) {}

  initMenuItems(): Observable<menuItem[]> {
    return this.http
      .get<menuItem[]>('http://localhost:3333/api/menuItems')
      .pipe(
        tap((menuItems) => {
          this.menuItemsStore.add(menuItems);
        }),
        catchError((err) => {
          console.log('Error: ', err.message);
          return throwError(() => new Error(err.message));
        })
      ) as Observable<menuItem[]>;
  }

  addMenuItem(menuItemForm: MenuItemForm, id?: string): Observable<menuItem> {
    if (!id) {
      const item = this.createNewMenuItem(menuItemForm);
      return this.http.post<menuItem>(
        'http://localhost:3333/api/menuItems',
        item
      ) as Observable<menuItem>;
    } else {
      return this.patchMenuItem(menuItemForm, id) as Observable<menuItem>;
    }
  }

  addMenuItemToFavorites({ id, favorite }: menuItem): Observable<menuItem> {
    return this.http
      .patch<menuItem>(`http://localhost:3333/api/menuItems/${id}`, {
        id,
        favorite,
      })
      .pipe(
        tap(() => {
          this.menuItemsStore.update(id, { favorite });
        })
      ) as Observable<menuItem>;
  }

  getMenuItemById(id: string) {
    return this.http.get<menuItem>(`http://localhost:3333/api/menuItems/${id}`);
  }

  deleteMenuItem(id: string): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:3333/api/menuItems/${id}`)
      .pipe(
        tap(() => {
          this.menuItemsStore.remove(id);
        })
      ) as Observable<void>;
  }

  private createNewMenuItem(menuItemForm: MenuItemForm) {
    return {
      ...menuItemForm,
      id: guid(),
      favorite: false,
    } as menuItem;
  }

  private patchMenuItem(
    menuItemForm: MenuItemForm,
    id: string
  ): Observable<menuItem> {
    return this.http
      .patch<menuItem>(`http://localhost:3333/api/menuItems/${id}`, {
        ...menuItemForm,
        id,
      })
      .pipe(
        tap(() => {
          this.menuItemsStore.update(id, menuItemForm);
        })
      ) as Observable<menuItem>;
  }
}
