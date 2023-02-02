import { el } from 'redom';

const renderExchangeList = (currArray) => {
  const types = [];
  const container = el('div.currency-row__currency-type');
  const currencyBtn = el(
    'button.btn-reset.currency-type__btn',
    { 'data-type': currArray[0] },
    currArray[0]
  );
  const currencyList = el('ul.list-reset.currency__list');

  currArray.forEach((currency) => {
    const listItem = el(
      'li.currency-list__item',
      {
        'data-type': currency,
      },
      currency
    );
    types.push(listItem);
    currencyList.append(listItem);
  });

  currencyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currencyList.classList.toggle('currency__list--active');
    currencyBtn.classList.toggle('currency__list--active');
    currencyBtn.classList.remove('amount-row__input--invalid');
  });

  container.addEventListener('mouseleave', () => {
    currencyList.classList.remove('currency__list--active');
    currencyBtn.classList.remove('currency__list--active');
  });

  const setType = (type) => {
    type.addEventListener('click', () => {
      currencyBtn.textContent = type.textContent;
      currencyBtn.setAttribute('data-type', type.textContent);
      types.forEach((type) =>
        type.classList.remove('currency-list__item--active')
      );
      type.classList.add('currency-list__item--active');
      currencyList.classList.remove('currency__list--active');
      currencyBtn.classList.remove('currency__list--active');
    });
  };

  for (const type of types) {
    setType(type);
  }

  container.append(currencyBtn, currencyList);
  return { container, types, currencyBtn, currencyList };
};

export { renderExchangeList as default };
