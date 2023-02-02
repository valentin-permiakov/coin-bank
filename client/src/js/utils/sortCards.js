import {
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
} from './dragAndDropHandlers';
const months = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

const sortCardsList = (cardsList, sortOptions) => {
  const transform = (type, content) => {
    switch (type) {
      case 'Balance':
        return Number(content);
      case 'Transaction': {
        const dateArray = content.split(' ');
        if (dateArray[0] < 10) {
          dateArray[0] = `0${dateArray[0]}`;
        }
        dateArray[1] = months[dateArray[1]];
        return dateArray.reverse().join('-');
      }
      default:
        return content;
    }
  };

  const sortCards = (index) => {
    const type = sortOptions[index].getAttribute('data-type');
    const cards = document.querySelectorAll('.cards-list__card-item');
    const newCards = Array.from(cards);

    if (type === 'Custom') {
      cards.forEach((card) => {
        card.style.cursor = 'move';
        card.draggable = true;
        card.addEventListener('dragstart', handleDragStart, false);
        card.addEventListener('dragenter', handleDragEnter, false);
        card.addEventListener('dragover', handleDragOver, false);
        card.addEventListener('dragleave', handleDragLeave, false);
        card.addEventListener('drop', handleDrop, false);
        card.addEventListener('dragend', handleDragEnd, false);
        card.addEventListener('dragend', () => {
          cards.forEach((box) => {
            box.classList.remove('cards-list__card-item--over');
          });
        });
      });
      if (localStorage.getItem('cardsOrder')) {
        const cardsOrder = JSON.parse(localStorage.getItem('cardsOrder'));
        let customCards = [];
        cardsOrder.forEach((id) => {
          const card = newCards.find((card) => card.id === id);
          if (card) {
            customCards.push(card);
          } else {
            cardsOrder.splice(cardsOrder.indexOf(id), 1);
          }
        });
        customCards = [...new Set(customCards.concat(newCards))];
        [].forEach.call(cards, (card) => {
          cardsList.removeChild(card);
        });

        customCards.forEach((customCard) => {
          cardsList.appendChild(customCard);
        });
        localStorage.setItem('cardsOrder', JSON.stringify(cardsOrder));
      }
    } else {
      cards.forEach((card) => {
        card.style.cursor = 'default';
        card.draggable = false;
        card.removeEventListener('dragstart', handleDragStart);
        card.removeEventListener('dragenter', handleDragEnter);
        card.removeEventListener('dragover', handleDragOver);
        card.removeEventListener('dragleave', handleDragLeave);
        card.removeEventListener('drop', handleDrop);
        card.removeEventListener('dragend', handleDragEnd);
      });

      newCards.sort((cardA, cardB) => {
        const dataA = cardA.querySelectorAll('.card-item--sorting')[index]
          .textContent;
        const dataB = cardB.querySelectorAll('.card-item--sorting')[index]
          .textContent;

        const a = transform(type, dataA);
        const b = transform(type, dataB);

        switch (true) {
          case a < b:
            return 1;
          case a > b:
            return -1;
          case a === b:
            return 0;
        }
      });

      [].forEach.call(cards, (card) => {
        cardsList.removeChild(card);
      });

      newCards.forEach((newCard) => {
        cardsList.appendChild(newCard);
      });
    }
  };

  [].forEach.call(sortOptions, (option, index) => {
    option.addEventListener('click', () => {
      sortCards(index);
    });
  });
};

export { sortCardsList as default };
