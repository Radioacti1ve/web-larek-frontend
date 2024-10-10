import { ICard, ICardsData, IBasketData, basketCard } from "../types";
import { EventEmitter } from "./base/events";

export class CardsData implements ICardsData {
  protected cards: ICard[];
  constructor(protected events: EventEmitter) {};

  setCards(cards: ICard[]): void {
    this.cards = cards;
    this.events.emit('cards:changed');
  }

  getCards(): ICard[] {
    return this.cards;
  }

  getCard(id: string): ICard {
    return this.cards.find(elem => elem.id === id) as ICard;
  }
}

export class BasketData implements IBasketData {
  protected cards: basketCard[] = [];
  protected goods: number;
  protected total: number;

  constructor(protected events: EventEmitter) {};

  setTotal(): void {
    this.total = this.cards.reduce((accumalator, currentValue) => accumalator + currentValue.price, 0);
  }

  getCards(): basketCard[] {
    return this.cards
  }

  getTotal(): number {
    return this.total;
  }

  getGoods(): number {
    return this.cards.length;
  }

  addItem(card: ICard): void {
    this.cards.push(card);
    this.setTotal();
    this.events.emit('basket:changed');
  }

  deleteItem(id: string): void {
    this.cards.filter(card => card.id === id);
    this.setTotal();
    this.events.emit('basket:changed');
  }
}
