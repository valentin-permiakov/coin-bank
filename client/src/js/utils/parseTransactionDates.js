const months = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

const getDatesArr = (numMonths) => {
  const dateArr = [];
  const labels = [];
  for (
    let i = new Date().getMonth() + 1;
    i > new Date().getMonth() + 1 - numMonths;
    i--
  ) {
    let month = 0;
    let year = 0;
    if (i > 10) {
      month = i;
      labels.push(months[month]);
      year = new Date().getFullYear();
    } else if (i > 0) {
      month = `0${i}`;
      labels.push(months[month]);
      year = new Date().getFullYear();
    } else {
      month = i + 12 < 10 ? `0${i + 12}` : i + 12;
      labels.push(months[month]);
      year = new Date().getFullYear() - 1;
    }
    const dateStr = `${year}-${month}`;
    dateArr.push(dateStr);
  }
  return { dateArr, labels };
};

export { getDatesArr as default };
