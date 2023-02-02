const getChartData = (searchStr, { transactions }) => {
  const transactionsArr = transactions.filter((transaction) =>
    transaction.date.includes(searchStr)
  );

  return transactionsArr;
};

export { getChartData as default };
