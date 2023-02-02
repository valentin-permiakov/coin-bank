import { el } from 'redom';
import Chart from 'chart.js/auto';
import renderHistoryTable from '../utils/renderHistoryTable';
import { router } from '../utils/routing';
import getChartsData from '../utils/getChartsData';
import getDateArr from '../utils/parseTransactionDates';
import renderHistoryChart from '../utils/renderHistoryChart';

const renderAccountHistory = (data) => {
  const container = el('div.card-details__container.container');
  const containerTop = el('div.card-details__top-container', [
    el('div.card-details__top-left', [
      el('h2.section-header', 'Account History'),
      el('span.card-details__account-num', data.account),
    ]),
    el('div.card-details__top-right', [
      el(
        'a.card-details__back-link',
        {
          href: `/account/${data.account}`,
          onclick(e) {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
          },
        },
        'Back to Details'
      ),
      el('span.card-details__balance-name', 'Balance'),
      el('span.card-details__balance-amount', data.balance),
    ]),
  ]);
  const containerMid = el('div.card-history__middle-container', [
    el(
      'div.bar-chart-container.card-history__bar-chart#history-balance-dynamic',
      el('h3.bar-chart__heading', 'Balance Overview')
    ),
    el(
      'div.bar-chart-container.card-history__bar-chart#history-transaction-ratio',
      el('h3.bar-chart__heading', 'Outgoing/Incoming transaction ratio')
    ),
  ]);

  if (data.transactions.length > 0) {
    containerMid.children[0].append(renderHistoryChart(10, data));
    containerMid.children[1].append(renderIncomeExpenseChart(data));
  } else {
    containerMid.children[0].append('No Balance Changes');
    containerMid.children[1].append('No Transactions');
  }

  const historyTable = renderHistoryTable(25, data);
  historyTable.children[0].setAttribute('id', 'account-history-table');
  container.append(containerTop, containerMid, historyTable);
  return container;
};

const renderIncomeExpenseChart = (data) => {
  const chartContainer = el('canvas#balanceChart');
  const dateArr = getDateArr(10);

  const transactionArr = [];
  const expense = [];
  const income = [];
  const labels = dateArr.labels;

  dateArr.dateArr.forEach((date) => {
    const dataItem = getChartsData(date, data);
    transactionArr.push(dataItem);
  });
  transactionArr.forEach((item) => {
    if (item.length === 0) {
      expense.push(0);
      income.push(0);
    } else {
      const sumObj = {
        income: 0,
        expense: 0,
      };
      item.forEach(({ amount, from }) =>
        data.account !== from
          ? (sumObj.income += amount)
          : (sumObj.expense -= amount)
      );
      income.push(sumObj.income);
      expense.push(sumObj.expense);
    }
  });

  new Chart(chartContainer, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Outgoing $',
          data: expense,
          backgroundColor: '#FD4E5D',
        },
        {
          label: 'Incoming $',
          data: income,
          backgroundColor: '#76CA66',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  return chartContainer;
};

export { renderAccountHistory as default };
