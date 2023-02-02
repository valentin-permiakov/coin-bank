import { el, svg } from 'redom';
import { sendTransfer } from '../utils/api';
import { router } from '../utils/routing';
import renderTable from '../utils/renderHistoryTable';
import CARDS from '../utils/svgCards';
import cardNumberMask from '../utils/transferMask';
import renderHistoryChart from '../utils/renderHistoryChart';

const validationObj = {
  number: false,
  amount: false,
};
const creditCardType = require('credit-card-type');

const renderAccountDetails = (data) => {
  const container = el(
    'div.card-details__container.container#details-container'
  );
  const containerTop = el('div.card-details__top-container', [
    el('div.card-details__top-left', [
      el('h2.section-header', 'Account Details'),
      el('span.card-details__account-num', data.account),
    ]),
    el('div.card-details__top-right', [
      el(
        'a.card-details__back-link',
        {
          href: '/accounts',
          onclick(e) {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
          },
        },
        'Back To Accounts'
      ),
      el('span.card-details__balance-name', 'Balance'),
      el('span.card-details__balance-amount#balance-amount', data.balance),
    ]),
  ]);
  const containerMid = el('div.card-details__middle-container', [
    el(
      'div.card-details__money-transfer-container',
      el('h3.money-transfer__heading', 'New Transfer')
    ),
    el(
      'div.bar-chart-container.details__bar-chart-container#history-chart-container',
      {
        onclick() {
          router.navigate(`/account/${data.account}/history`);
        },
      },
      el('h3.bar-chart__heading', 'Balance Overview')
    ),
  ]);

  containerMid.children[1].append(renderHistoryChart(6, data));

  const errorSpan = el(
    'span.money-transfer__error-message#transfer-form-error'
  );
  const transferForm = renderTransferForm(errorSpan, data);
  const historyTable = renderTable(10, data);

  containerMid.children[0].append(transferForm, errorSpan);
  container.append(containerTop, containerMid, historyTable);
  return container;
};

export { renderAccountDetails as default };

const renderTransferForm = (errorSpan, { account, balance }) => {
  const sendForm = el('form', [
    el(
      'div.money-transfer__input-container',
      el(
        'label.money-transfer__input-label',
        { for: 'transfer-account' },
        'Recipient Account'
      )
    ),
    el(
      'div.money-transfer__input-container',
      el(
        'label.money-transfer__input-label',
        { for: 'transfer-amount' },
        'Transfer Amount $'
      )
    ),
    el(
      'button.money-transfer__send-btn.btn-reset#money-transfer-btn',
      { disabled: true },
      'Send'
    ),
  ]);
  const cardIcon = svg('svg.cardicon#cardicon', {
    width: '750',
    height: '471',
    viewBox: '0 0 750 471',
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  });

  const accountInput = el('input.money-transfer__input#transfer-account', {
    required: true,
    type: 'text',
    placeholder: 'Account Number',
    inputmode: 'numeric',
    autocomplete: 'cc-number',
    oninput() {
      this.classList.remove('money-transfer__input--invalid');
      errorSpan.textContent = '';
      errorSpan.classList.remove('transfer-success');
      sendForm.children[2].disabled = true;
      const cardType = creditCardType(this.value);
      if (
        cardType[0] &&
        this.value.replace(/ /g, '').length > 0 &&
        this.value.replace(/ /g, '').length <= 18
      ) {
        switch (cardType[0].type) {
          case 'american-express':
            cardIcon.innerHTML = CARDS.amex;
            break;
          case 'visa':
            cardIcon.innerHTML = CARDS.visa;
            break;
          case 'diners-club':
            cardIcon.innerHTML = CARDS.diners;
            break;
          case 'discover':
            cardIcon.innerHTML = CARDS.discover;
            break;
          case 'jcb':
            cardIcon.innerHTML = CARDS.jcb;
            break;
          case 'maestro':
            cardIcon.innerHTML = CARDS.maestro;
            break;
          case 'mastercard':
            cardIcon.innerHTML = CARDS.mastercard;
            break;
          case 'unionpay':
            cardIcon.innerHTML = CARDS.unionpay;
            break;
          default:
            cardIcon.innerHTML = '';
            break;
        }
        if (this.value.replace(/ /g, '').length > 16) {
          cardIcon.innerHTML = '';
        }
      } else {
        cardIcon.innerHTML = '';
      }
    },
    onblur() {
      if (this.value.replace(/ /g, '') > 0) {
        validationObj.number = true;
        if (validationObj.number === true && validationObj.amount === true)
          sendForm.children[2].disabled = false;
      } else {
        validationObj.number = false;
        errorSpan.textContent = 'Recipient account required';
      }
    },
  });
  const amountInput = el('input.money-transfer__input#transfer-amount', {
    required: true,
    type: 'text',
    placeholder: '$1000',
    inputmode: 'numeric',
    autocomplete: 'transaction-amount',
    oninput() {
      this.classList.remove('money-transfer__input--invalid');
      errorSpan.textContent = '';
      errorSpan.classList.remove('transfer-success');
      sendForm.children[2].disabled = true;
    },
    onblur() {
      if (this.value.trim() > 0 && this.value > 0 && this.value <= balance) {
        validationObj.amount = true;
        if (validationObj.number === true && validationObj.amount === true)
          sendForm.children[2].disabled = false;
      } else {
        validationObj.amount = false;
        if (this.value <= 0) {
          errorSpan.textContent = 'Transfer amount must be positive';
        }
        if (this.value > balance) {
          errorSpan.textContent = 'Overdraft unavailable';
        }
      }
    },
  });
  const cardMask = cardNumberMask(accountInput);
  sendForm.children[0].append(accountInput, cardIcon);
  sendForm.children[1].append(amountInput);

  sendForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const detailsContainer = document.getElementById('details-container');
    const historyChartContainer = document.getElementById(
      'history-chart-container'
    );
    const historyChart = document.getElementById('historyChart');
    const historyTable = document.getElementById('history-table-container');
    const cardLogo = document.getElementById('cardicon');

    const tranferData = {
      from: account,
      to: accountInput.value.replace(/ /g, ''),
      amount: amountInput.value.trim(),
    };

    try {
      document
        .getElementById('money-transfer-btn')
        .classList.add('button--loading');
      const response = await sendTransfer(
        sessionStorage.getItem('userToken'),
        tranferData
      );

      document.getElementById('balance-amount').textContent = response.balance;
      historyChart.remove();
      historyTable.remove();
      historyChartContainer.append(renderHistoryChart(6, response));
      detailsContainer.append(renderTable(10, response));
      errorSpan.textContent = 'Transfer Successful';
      errorSpan.classList.add('transfer-success');
    } catch (error) {
      errorSpan.textContent = error.message;
    } finally {
      document
        .getElementById('money-transfer-btn')
        .classList.remove('button--loading');

      cardMask.value = '';
      amountInput.value = '';
      cardLogo.innerHTML = '';
    }
  });

  return sendForm;
};
