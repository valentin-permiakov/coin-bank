import { el } from 'redom';
import { curerncyExchange, getExchangeRates } from '../utils/api';
import renderExchangeList from '../utils/renderExchangeList';

const renderExchangePage = (currenciesData, allCurrencies) => {
  const keys = Object.keys(currenciesData);
  const container = el('div.container', [
    el('h2.section-header.exchange-section__heading', 'Currency Exchange'),
    el('.exchange-section__container', el('div.exchange-section__left')),
  ]);
  const accountCurrenciesContainer = el(
    'div.exchange-section__currencies-container#currencies-container',
    el('h3.currencies__heading', 'Your Currencies')
  );
  const ratesContainer = el('div.exchange-section__rates-container', [
    el('h3.currencies__heading', 'Real Time Exchange Rates'),
    el('div.rates-container__container'),
  ]);

  const currencyExchangeContainer = el(
    'div.exchange-section__exchange-container',
    el('h3.currencies__heading', 'Currency Exchange Form')
  );

  const errorSpan = el('span.exchange-section__error-message');

  for (const key of keys) {
    const currencyRow = el('div.currencies__currency-row', [
      el('span.currencies__currency-name', key),
      el(
        'span.currencies__currency-amount',
        Math.round((currenciesData[key].amount + Number.EPSILON) * 1000) / 1000
      ),
    ]);
    accountCurrenciesContainer.append(currencyRow);
  }

  renderExchangeRates(ratesContainer.children[1]);

  currencyExchangeContainer.append(
    renderExchangeForm(keys, allCurrencies, errorSpan),
    errorSpan
  );

  container.children[1].children[0].append(
    accountCurrenciesContainer,
    currencyExchangeContainer
  );
  container.children[1].append(ratesContainer);
  return container;
};

const renderExchangeForm = (myCurrencies, allCurrencies, errorSpan) => {
  const form = el('form.exchange__exchange-form', [
    el('div.exchange-form__left', [
      el('div.exchange-form__currency-row'),
      el('div.exchange-form__amount-row', [
        el('label.amount-row__label', { for: 'exchange-amount' }, 'Amount'),
        el('input.amount-row__input#exchange-amount', {
          type: 'text',
          placeholder: '1000',
          required: true,
          oninput() {
            this.classList.remove('amount-row__input--invalid');
            errorSpan.textContent = '';
            errorSpan.classList.remove('transfer-success');
            if (this.value > 0) {
              form.children[1].disabled = false;
            } else {
              form.children[1].disabled = true;
            }
          },
          onblur() {
            if (this.value <= 0) {
              errorSpan.textContent = 'Amount must be positive';
              this.classList.add('amount-row__input--invalid');
            }
          },
        }),
      ]),
    ]),
    el(
      'button.exchange-form__submit-btn.btn-reset#exchange-btn',
      {
        disabled: true,
      },
      'Exchange'
    ),
  ]);

  const spanFrom = el('span.currency-row__span', 'From');
  const spanTo = el('span.currency-row__span', 'to');

  const myCurrenciesList = renderExchangeList(myCurrencies);
  const allCurrenciesList = renderExchangeList(allCurrencies);

  myCurrenciesList.currencyBtn.id = 'my-currencies-btn';
  myCurrenciesList.currencyList.id = 'my-currencies-list';
  allCurrenciesList.currencyBtn.id = 'all-currencies-btn';
  allCurrenciesList.currencyList.id = 'all-currencies-list';

  myCurrenciesList.container.addEventListener('click', () => {
    errorSpan.textContent = '';
    errorSpan.classList.remove('transfer-success');
  });

  allCurrenciesList.container.addEventListener('click', () => {
    errorSpan.textContent = '';
    errorSpan.classList.remove('transfer-success');
  });

  form.children[0].children[0].append(
    spanFrom,
    myCurrenciesList.container,
    spanTo,
    allCurrenciesList.container
  );

  form.addEventListener('submit', async (e) => {
    e.preventDefault(e);
    const exchangeAmount = form.children[0].children[1].children[1];
    const exchangeData = {
      from: myCurrenciesList.currencyBtn.getAttribute('data-type'),
      to: allCurrenciesList.currencyBtn.getAttribute('data-type'),
      amount: exchangeAmount.value,
    };

    if (exchangeData.from === exchangeData.to) {
      errorSpan.textContent = 'Must choose different currencies';
      return;
    }

    try {
      document.getElementById('exchange-btn').classList.add('button--loading');
      const response = await curerncyExchange(
        sessionStorage.getItem('userToken'),
        exchangeData
      );
      const keys = Object.keys(response);

      document
        .querySelectorAll('.currencies__currency-row')
        .forEach((item) => item.remove());

      for (const key of keys) {
        const currencyRow = el('div.currencies__currency-row', [
          el('span.currencies__currency-name', key),
          el(
            'span.currencies__currency-amount',
            Math.round((response[key].amount + Number.EPSILON) * 1000) / 1000
          ),
        ]);
        document.getElementById('currencies-container').append(currencyRow);
      }
      errorSpan.textContent = 'Exchange Successful!';
      errorSpan.classList.add('transfer-success');
    } catch (error) {
      errorSpan.textContent = error.message;
    } finally {
      document
        .getElementById('exchange-btn')
        .classList.remove('button--loading');
      exchangeAmount.value = '';
    }
  });

  return form;
};

const renderExchangeRates = (container) => {
  getExchangeRates.onmessage = (e) => {
    const { from, to, rate, change } = JSON.parse(e.data);

    const changeContainer = el('div.rates__change-container', [
      el('span.exchange-rates__currency-name', `${from}/${to}`),
      el('span.exchange-rates__currency-rate', rate),
    ]);

    if (change > 0) {
      changeContainer.classList.add('rates__change-container--positive');
    }

    if (change < 0) {
      changeContainer.classList.add('rates__change-container--negative');
    }

    container.prepend(changeContainer);
    if (container.children.length > 20) {
      container.children[container.children.length - 1].remove();
    }

    return changeContainer;
  };
};

export { renderExchangePage as default };
