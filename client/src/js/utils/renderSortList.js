import { el } from 'redom';

const renderSortList = () => {
  const container = el('div.cards-top__sort-type');
  const sortBtn = el('button.btn-reset.sort__button', 'Sort Accounts');
  const sortList = el('ul.list-reset.sort__list');
  const sortNumber = el(
    'li.sort-list__item',
    { 'data-type': 'Number' },
    'Account Number'
  );
  const sortBalance = el(
    'li.sort-list__item',
    { 'data-type': 'Balance' },
    'Balance'
  );
  const sortTransaction = el(
    'li.sort-list__item',
    { 'data-type': 'Transaction' },
    'Last Transaction'
  );
  const sortCustom = el(
    'li.sort-list__item',
    { 'data-type': 'Custom' },
    'Custom Order'
  );

  sortBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sortList.classList.toggle('sort__list--active');
    sortBtn.classList.toggle('sort__list--active');
  });

  container.addEventListener('mouseleave', () => {
    sortList.classList.remove('sort__list--active');
    sortBtn.classList.remove('sort__list--active');
  });

  const setType = (type) => {
    type.addEventListener('click', () => {
      sortBtn.textContent = type.textContent;
      types.forEach((type) => type.classList.remove('sort-list__item--active'));
      type.classList.add('sort-list__item--active');
      sortList.classList.remove('sort__list--active');
      sortBtn.classList.remove('sort__list--active');
    });
  };

  const types = [sortNumber, sortBalance, sortTransaction, sortCustom];

  for (const type of types) {
    setType(type);
  }

  sortList.append(sortNumber, sortBalance, sortTransaction, sortCustom);
  container.append(sortBtn, sortList);
  return { container, types };
};

export { renderSortList as default };
