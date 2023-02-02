import getDatesArr from '../utils/parseTransactionDates';
import Chart from 'chart.js/auto';
import { el } from 'redom';

const renderHistoryChart = (monthsNum, { transactions, balance, account }) => {
  const chartContainer = el('canvas#historyChart');
  const datesArr = getDatesArr(monthsNum);
  const dates = datesArr.dateArr;
  dates.pop();
  const labels = datesArr.labels;
  const balanceArr = [];
  const transactionArr = [];

  let currentBalance = balance;

  balanceArr.push(currentBalance);

  dates.forEach((date) => {
    const transactionsArr = transactions.filter((transaction) =>
      transaction.date.includes(date)
    );
    transactionArr.push(transactionsArr);
  });

  transactionArr.forEach((item) => {
    if (item.length === 0) {
      balanceArr.push(currentBalance);
    } else {
      item.forEach(({ amount, from }) => {
        currentBalance -= from !== account ? amount : -amount;
      });
      balanceArr.push(currentBalance);
    }
  });

  new Chart(chartContainer, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Balance $',
          data: balanceArr,
          backgroundColor: '#116ACC',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return chartContainer;
};

export { renderHistoryChart as default };
