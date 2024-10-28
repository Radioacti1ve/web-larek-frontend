import './scss/styles.scss';
import { BasketData, CardsData} from './components/Models'
import { EventEmitter } from './components/base/events';
import {CardView} from './components/CardsView';
import {Modal} from './components/base/Modal'
import { BasketHeaderView } from './components/BasketView'
import { OrderForm, Form } from './components/Form'
import { cloneTemplate } from './utils/utils';


const events = new EventEmitter();
events.onAll((events) => {
  console.log(events.eventName, events.data);
})

const page = document.querySelector('.gallery');
const template = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardTemplate = template.content.cloneNode(true) as HTMLButtonElement;
const modal = document.querySelector('#modal-container') as HTMLElement;
const mainBasket = document.querySelector('.header__basket') as HTMLButtonElement;
const form = cloneTemplate('#contacts') as HTMLTemplateElement;

const waysBuy = new Form(form, events);
// waysBuy.checkValidity();

// const newModal = new Modal(modal, events);
// newModal.open(waysBuy.render());

const myCard = new CardView(cardTemplate, events);

const cards = [
  {
    id: "1",
    description: "Если планируете решать задачи в тренажёре, берите два.",
    image: "/5_Dots.svg",
    title: "+1 час в сутках",
    category: "софт-скил",
    price: 750
  },
  {
    id: "2",
    description: "Если планируете решать задачи в тренажёре, берите два.",
    image: "/5_Dots.svg",
    title: "+50000 час в сутках",
    category: "софт-скил",
    price: 750
  },
  {
    id: "3",
    description: "Если планируете решать задачи в тренажёре, берите два.",
    image: "/5_Dots.svg",
    title: "+10 час в сутках",
    category: "софт-скил",
    price: 750
  },
  {
    id: "4",
    description: "Если планируете решать задачи в тренажёре, берите два.",
    image: "/5_Dots.svg",
    title: "+5 час в сутках",
    category: "софт-скил",
    price: 750
  },
]

const carddata = new CardsData(events);
const basket = new BasketData(events);

carddata.setCards(cards);
basket.addItem(cards[0]);
basket.addItem(cards[3]);
console.log(myCard.render());


// console.log('my cards:  ', carddata.getCards());
// console.log('basket:  ', basket.getTotal()); 

page.append(myCard.render());