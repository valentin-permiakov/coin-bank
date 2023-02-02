import { el } from 'redom';

const renderCardsSkeleton = () => {
  const container = el('div.container', [
    el('div.cards-section__top.cards-skeleton__top', [
      el('div.cards-top__left', [
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
      ]),
      el('span.skeleton__span--btn.skeleton-bg'),
    ]),
    el('ul.cards-section__cards-list.list-reset', [
      el('li.skeleton-list__card-item.skeleton-bg'),
      el('li.skeleton-list__card-item.skeleton-bg'),
      el('li.skeleton-list__card-item.skeleton-bg'),
      el('li.skeleton-list__card-item.skeleton-bg'),
      el('li.skeleton-list__card-item.skeleton-bg'),
      el('li.skeleton-list__card-item.skeleton-bg'),
    ]),
  ]);

  return container;
};

const renderDetailsSkeleton = () => {
  const container = el('div.container', [
    el('div.card-details__top-container', [
      el('div.card-details__top-left', [
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
      ]),
      el('div.card-details__top-right', [
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
      ]),
    ]),
    el('div.card-details__middle-container', [
      el('div.skeleton-bg.skeleton__div'),
      el('div.skeleton-bg.skeleton__div'),
    ]),
    el('div.skeleton-bg.skeleton__div--big'),
  ]);

  return container;
};

const renderHistorySkeleton = () => {
  const container = el('div.container', [
    el('div.card-details__top-container', [
      el('div.card-details__top-left', [
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
      ]),
      el('div.card-details__top-right', [
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
      ]),
    ]),
    el('div.skeleton-bg.skeleton__div--big'),
    el('div.skeleton-bg.skeleton__div--big'),
    el('div.skeleton-bg.skeleton__div--big'),
  ]);

  return container;
};

const renderExchangeSkeleton = () => {
  const container = el('div.container', [
    el('span.skeleton__span--text.skeleton-bg'),
    el('div.exchange-section__container', [
      el('div.exchange-section__left', [
        el('div.exchange-section__currencies-container', [
          el('span.skeleton__span--text.skeleton-bg'),
          el('span.skeleton__span--text.skeleton-bg'),
          el('span.skeleton__span--text.skeleton-bg'),
          el('span.skeleton__span--text.skeleton-bg'),
          el('span.skeleton__span--text.skeleton-bg'),
          el('span.skeleton__span--text.skeleton-bg'),
        ]),
        el('div.skeleton-bg.skeleton__div--big', { style: 'margin-bottom:0' }),
      ]),
      el('div.exchange-section__rates-container', [
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
        el('span.skeleton__span--text.skeleton-bg'),
      ]),
    ]),
  ]);

  return container;
};

const renderAtmsSkeleton = () => {
  const container = el('div.container', [
    el('span.skeleton__span--text.skeleton-bg'),
    el('div.skeleton-bg.skeleton__div--big.skeleton__div--extra-big'),
  ]);

  return container;
};

export {
  renderCardsSkeleton,
  renderDetailsSkeleton,
  renderHistorySkeleton,
  renderExchangeSkeleton,
  renderAtmsSkeleton,
};
