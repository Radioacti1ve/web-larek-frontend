import { ICard } from "../types";
import { Component } from "./base/component";
import {ensureElement} from '../utils/utils'
import { EventEmitter } from "./base/events";

abstract class Card extends Component<ICard> {
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;
  protected _id: string;

  set title(value: string) {
    this.setText(this._title, value);
  }
  
  set price(value: number) {
    this.setText(this._price, value.toString());
  }

  set id(value: string) {
    this._id = value;
  }
}

export class CardView extends Card {
  protected card: HTMLButtonElement;
  protected _category: HTMLSpanElement;
  protected _image: HTMLImageElement;

  constructor(container: HTMLButtonElement, protected events: EventEmitter) {
    super(container);

    this.card = ensureElement('.card', this.container) as HTMLButtonElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._category = ensureElement('.card__category', this.container) as HTMLSpanElement;
    this._title = ensureElement('.card__title', this.container) as HTMLHeadingElement;
    this._price = ensureElement('.card__price', this.container) as HTMLSpanElement;

    this.card.addEventListener('click', () => this.events.emit('card:open', {id: this._id})) 
  }

  set image(value: string) {
    this.setImage(this._image, value, 'Изображение товара: ' + this._title.textContent);
  }

  set category(value: string) {
    this.setText(this._category, value);
  }
}

export class CardCompactView extends Card {
  protected deleteButton: HTMLButtonElement;
  protected _index: HTMLSpanElement;

  constructor(container: HTMLButtonElement, protected events: EventEmitter) {
    super(container);

    this._index = ensureElement('.basket__item-index', this.container);
    this.deleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;
    this._title = ensureElement('.card__title', this.container) as HTMLHeadingElement;
    this._price = ensureElement('.card__price', this.container) as HTMLSpanElement;

    this.deleteButton.addEventListener('click', () => this.events.emit('basket:deleteCard', {id: this._id}));
  }

  set index(value: number) {
    this.setText(this._index, value);
  }
}

export class CardFullView extends Card {
  protected _image: HTMLImageElement;
  protected _description: HTMLParagraphElement;
  protected _category: HTMLSpanElement;
  protected addButton: HTMLButtonElement;

  constructor(container: HTMLButtonElement, protected events: EventEmitter) {
    super(container);

    this.addButton = ensureElement('.button', this.container) as HTMLButtonElement;
    this._image = ensureElement('.card__image', this.container) as HTMLImageElement;
    this._category = ensureElement('.card__category', this.container) as HTMLSpanElement;
    this._title = ensureElement('.card__title', this.container) as HTMLHeadingElement;
    this._price = ensureElement('.card__price', this.container) as HTMLSpanElement;
    this._description = ensureElement('.card__text', this.container) as HTMLParagraphElement;

    this.addButton.addEventListener('click', () => this.events.emit('basket:addCard', {id: this._id}))
  }

  set image(value: string) {
    this.setImage(this._image, value, 'Изображение товара: ' + this._title.textContent);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set category(value: string) {
    this.setText(this._category, value);
  }
}