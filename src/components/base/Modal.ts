import { Component } from './component';
import { EventEmitter } from './events';
import { ensureElement } from '../../utils/utils';

export interface IModal {
  open(content: HTMLElement): void;
  close(): void;
}

export class Modal extends Component<IModal> implements IModal {
	protected currentModal: HTMLElement;
	protected content: HTMLElement | undefined;
	protected buttonClose: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.currentModal = ensureElement('.modal__container', this.container);
		this.content = ensureElement('.modal__content', this.container);
		this.buttonClose = ensureElement('.modal__close', this.container) as HTMLButtonElement;

		this.buttonClose.addEventListener('click', () => this.events.emit('modal:close'));

    this.container.addEventListener('click', () => {
      this.close.bind(this);
			this.events.emit('modal:close');
    });

	}

	open(content: HTMLElement): void {
		this.container.classList.add('modal_active');
		this.content.append(content);
		this.events.emit('modal:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.content = undefined;
	}
}
