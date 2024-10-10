import { Component } from "./base/component";
import { ensureElement } from '../utils/utils'
import { EventEmitter } from "./base/events";

export interface IBasketView {
  set list(cards: HTMLElement[]);
  set total(value: number);
}

export class BasketView extends Component<IBasketView> {
  protected _list: HTMLUListElement;
  protected buyButton: HTMLButtonElement;
  protected _total: HTMLSpanElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._list = ensureElement('.basket__list', this.container) as HTMLUListElement;
    this.buyButton = ensureElement('.button', this.container) as HTMLButtonElement;
    this._total = ensureElement('.basket__price', this.container);

    this.buyButton.addEventListener('click', () => this.events.emit('basket:buy'));
  }
  
  set list(cards: HTMLElement[]) {
    cards.forEach(card => this._list.append(card));
  }
  
  set total(value: number) {
    this.setText(this._total, value);
  }
}

export interface IBasketHeaderView {
  set goods(value: number);
}

export class BasketHeaderView extends Component<IBasketHeaderView> {
  protected _basket: HTMLButtonElement;
  protected _goods: HTMLSpanElement;

  constructor(container: HTMLButtonElement, protected events: EventEmitter) {
    super(container);

    this._basket = ensureElement('.header__basket', this.container) as HTMLButtonElement;
    this._goods = ensureElement('.header__basket-counter', this.container);

    this._basket.addEventListener('click', () => this.events.emit('basket:open'))
  }

  set goods(value: number) {
    this.setText(this._goods, value);
  }
}