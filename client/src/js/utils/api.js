export const fetchLogin = (login, password) => {
  return fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.payload) {
        const token = data.payload.token;
        return token;
      } else {
        const error = data.error;
        return error;
      }
    });
};

export const getClientData = (token) => {
  return fetch('http://localhost:3000/accounts', {
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((accounts) => {
      return accounts.payload;
    })
    .catch((error) => document.body.append(error));
};

export const createNewCard = (token) => {
  return fetch('http://localhost:3000/create-account', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((accounts) => {
      return accounts.payload;
    });
};

export const getAtmsLocation = () => {
  return fetch('http://localhost:3000/banks')
    .then((res) => res.json())
    .then((data) => {
      return data.payload;
    });
};

export const getAccountDetails = (token, id) => {
  return fetch(`http://localhost:3000/account/${id}`, {
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((accounts) => {
      return accounts.payload;
    })
    .catch((error) => document.body.append(error));
};

export const sendTransfer = (token, { from, to, amount }) => {
  return fetch('http://localhost:3000/transfer-funds', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.payload) {
        return data.payload;
      } else {
        throw new RangeError(data.error);
      }
    });
};

export const getAccountCurrencies = (token) => {
  return fetch('http://localhost:3000/currencies', {
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((curerncies) => {
      return curerncies.payload;
    })
    .catch((error) => document.body.append(error));
};

export const getAllCurrencies = (token) => {
  return fetch('http://localhost:3000/all-currencies', {
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .then((curerncies) => {
      return curerncies.payload;
    })
    .catch((error) => document.body.append(error));
};

export const curerncyExchange = (token, { from, to, amount }) => {
  return fetch('http://localhost:3000/currency-buy', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      amount,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.payload) {
        return data.payload;
      } else {
        throw new RangeError(data.error);
      }
    });
};

export const getExchangeRates = new WebSocket(
  'ws://localhost:3000/currency-feed'
);
