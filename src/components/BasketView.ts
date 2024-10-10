import { ICard } from "../types";
import { Component } from "./base/component";
import {ensureElement} from '../utils/utils'
import { EventEmitter } from "./base/events";

export interface IBasketView {
  cardsContainer: HTMLUListElement;
  buyButton: HTMLButtonElement;
  _total: HTMLSpanElement;
}

export class BasketView extends Component<IBasketView> {
  
}