import { el } from 'redom';
import { router } from './routing';

class tableRow {
  constructor({ date, from, to, amount }, myAccount) {
    const transactionDate = new Date(date);
    const formatedDate = `${transactionDate.getDate()}.${
      transactionDate.getMonth() + 1
    }.${transactionDate.getFullYear()}`;

    this.el = el('tr.history-table__body-row', [
      el('td.body-row__from', from),
      el('td.body-row__to', to),
      el('td.body-row__amount', `${to !== myAccount ? -amount : amount} $`),
      el('td.body-row__date', formatedDate),
    ]);

    to === myAccount
      ? this.el.children[2].classList.add('history-table__cell--positive')
      : this.el.children[2].classList.add('history-table__cell--negative');
  }
}

const renderTable = (counter, { transactions, account }) => {
  if (transactions.length > 0) {
    const tableWrapper = el('div.history-table__wrapper');
    const container = el(
      'div.account-history__container#history-table-container',
      {
        onclick() {
          router.navigate(`/account/${account}/history`);
        },
      },
      [
        el('h3.account-history__heading', 'Transaction History'),
        el('table.account-history__table', [
          el(
            'thead.history-table__head',
            el('tr', [
              el('th.table-head__from', 'Sender Account'),
              el('th.table-head__to', 'Recipient Account'),
              el('th.table-head__amount', 'Amount'),
              el('th.table-head__date', 'Date'),
            ])
          ),
          el('tbody'),
        ]),
      ]
    );

    tableWrapper.append(container);

    let count = counter;
    let i = transactions.length - 1;

    while (count > 0 && i >= 0) {
      const tRow = new tableRow(transactions[i], account);
      container.children[1].children[1].append(tRow.el);

      count--;
      i--;
    }
    return tableWrapper;
  }
  const container = el(
    'div.account-history__container',
    {
      onclick() {
        router.navigate(`/account/${account}/history`);
      },
    },
    [
      el('h3.account-history__heading', 'Transaction History'),
      el('span', 'No Transactions'),
    ]
  );
  return container;
};

export { renderTable as default };
