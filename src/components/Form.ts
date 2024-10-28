import { Component } from "./base/component";
import { ensureElement, ensureAllElements } from '../utils/utils'
import { EventEmitter } from "./base/events";
import { IModalForm} from "../types/index"

export class Form extends Component <IModalForm> {
  protected inputList: HTMLInputElement[];
  protected _error: HTMLSpanElement;
  protected _submit: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._submit = ensureElement('.submit_button', this.container) as HTMLButtonElement;
    this.inputList = ensureAllElements('.form__input', this.container);
    this.inputList.forEach(input => {
      input.addEventListener('input', () => {
        this.events.emit(`${input.name}:input`, {[input.name]: input.value})
        this.error = this.checkValidity();
    });
    })

    this._error = ensureElement('.form__errors', this.container) as HTMLSpanElement;
    
  }

  checkValidity() {
    return this.inputList.some(input => !input.validity.valid);
  }

  set error(flag: boolean) {
    if(flag) {
      this._submit.disabled = true;
      this.setText(this._error, 'Заполните поле');
    } else {
      this._submit.disabled = false;
      this.setText(this._error, '');
    }
  }
}
 
export class OrderForm extends Form {
  protected payOnlineButton: HTMLButtonElement;
  protected payOnReceiptButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events); 

    this.payOnlineButton = ensureElement('.button_online', this.container) as HTMLButtonElement;
    this.payOnReceiptButton = ensureElement('.button_cash', this.container) as HTMLButtonElement;

    this.payOnReceiptButton.addEventListener('click', () => {
      this.events.emit('pay:way', {way: 'cash'})
    })
    this.payOnlineButton.addEventListener('click', () => { 
      this.events.emit('pay:way', {way: 'online'})
    })
    this._submit.addEventListener('click', (evt: MouseEvent) => {
      evt.preventDefault();
      this.events.emit('adress:submit')
    })
  }

  toggleButton(way: string) {
    if(way === 'cash') {
      this.payOnReceiptButton.classList.remove('button_alt')
      if(!this.payOnlineButton.classList.contains('button_alt')) {
        this.payOnlineButton.classList.add('button_alt')
      }
    } else if(way === 'online') {
      this.payOnlineButton.classList.remove('button_alt')
      if(!this.payOnReceiptButton.classList.contains('button_alt')) {
        this.payOnReceiptButton.classList.add('button_alt')
      }
    }
  }
}
