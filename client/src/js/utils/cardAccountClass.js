const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

class CardAccount {
  constructor({ account, balance, transactions }) {
    this.account = account;
    this.balance = balance;
    this.transactions = transactions;
  }

  formatDate() {
    if (this.transactions.length > 0) {
      const date = new Date(this.transactions[0].date);
      const formatedDate = `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
      return formatedDate;
    } else {
      return 'No transactions';
    }
  }
}

export { CardAccount as default };
