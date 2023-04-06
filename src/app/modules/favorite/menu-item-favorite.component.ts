import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',

  template: `
    <button class="star" (click)="onClick()">
      <img [src]="favoriteImage" />
    </button>
  `,

  styles: [
    `
      .star {
        all: unset;
        cursor: pointer;
        width: 16px;
        height: 16px;
        background-size: cover;
      }
    `,
  ],
})
export class FavoriteComponent {
  @Input() value: boolean;

  @Output() onChange = new EventEmitter<boolean>();

  get favoriteImage() {
    return this.value
      ? '../../assets/favorite-true.svg'
      : '../../assets/favorite-false.svg';
  }

  onClick() {
    this.onChange.emit(!this.value);
  }
}
