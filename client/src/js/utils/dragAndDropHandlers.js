let dragSrcEl = null;
let counter = 0;

export function handleDragStart(e) {
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  e.dataTransfer.setData('text/plain', this.id);
}

export const handleDragOver = (e) => {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  return false;
};

export function handleDragEnter() {
  this.classList.add('cards-list__card-item--over');
  counter++;
}

export function handleDragLeave() {
  counter--;
  if (counter === 0) this.classList.remove('cards-list__card-item--over');
}

export function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    dragSrcEl.id = this.id;
    this.innerHTML = e.dataTransfer.getData('text/html');
    this.id = e.dataTransfer.getData('text/plain');

    const cards = Array.from(
      document.querySelectorAll('.cards-list__card-item')
    );
    const cardsIdArr = [];
    cards.forEach((card) => {
      cardsIdArr.push(card.id);
    });
    localStorage.setItem('cardsOrder', JSON.stringify(cardsIdArr));
  }
  counter = 0;

  return false;
}

export function handleDragEnd() {
  this.style.opacity = '1';
}
