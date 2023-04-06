import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent implements OnInit, OnDestroy {
  title: Data;
  subscriptionTitle$: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptionTitle$ = this.activatedRoute.data
      .pipe(
        tap((data) => {
          this.title = data;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscriptionTitle$.unsubscribe();
  }
}
