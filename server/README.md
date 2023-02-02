# Backend for the "Coin." project

## Launching the server

1. 'npm start' starts the server
2. The server listens on port 3000 localhost.

## Login and Password

So far only one account is available:

- Login: `developer`
- Password: `test1234`

## Existing Accounts

The server has information about the following accounts:

1. User personal account (will receive transactions every several seconds):

   - 74213041477477406320783754

2. Other personal accounts created during development and testing

3. A collection of additional accounts not belonging to the user. Use them to check money transfer functionality:
   - 61253747452820828268825011
   - 05168707632801844723808510
   - 17307867273606026235887604
   - 27120208050464008002528428
   - 2222400070000005
   - 5555341244441115

## API response format

All API methods resonse with the following:

```js
{
  payload, // data depending on the  API method (null, in case of error or absence of data)
    error; // text of the error, if no error, contains an empty string.
}
```

## API Methods

### POST /login

User authorisation.
So far only one user available:

```js
{
	login: 'developer',
	password: 'skillbox'
}
```

Response contains payload:

```js
{
  token;
}
```

token — a string, containing information required for other requests.

**Possible errors:**

- `Invalid password`
- `No such user`

Token must be used in the headers for methods, requiring authorization: `Authorization: Basic TOKEN`, where TOKEN is the token from login method.

If any method returns and `Unauthorized` error, it means that we must provide the token in our request.

### GET /accounts

Returns an array of user accounts.

```js
[
  {
    account: '74213041477477406320783754',
    balance: 0,
    transactions: [
      {
        amount: 1234,
        date: '2021-09-11T23:00:44.486Z',
        from: '61253747452820828268825011',
        to: '74213041477477406320783754',
      },
    ],
  },
];
```

**Note:** this method includes only the last transaction of the account.

### GET /account/{id}

Method returns the detailed information about the account, where {id} is the account number.

Response format:

```js
[
  {
    account: '74213041477477406320783754',
    balance: 0,
    transactions: [
      {
        amount: 1234,
        date: '2021-09-11T23:00:44.486Z',
        from: '61253747452820828268825011',
        to: '74213041477477406320783754',
      },
    ],
  },
];
```

**Note:** this method includes the entire transaction history of the account.

### POST /create-account

Method creates a new account, request body not important

Response is an object:

```js
	"43123747452820828268825011": {
		"account": "43123747452820828268825011",
		"balance": 0,
		"mine": true,
		"transactions": []
	},
```

### POST /transfer-funds

Method for money transfer.

Request body:

```js
{
  from, // sender account
    to, // recipient account
    amount; // transfer amount
}
```

Method reponds with an object of an updated user account.

**Possible Errors:**

- `Invalid account from` — sender account not included or does not belong to the user;
- `Invalid account to` — recipient account not included or does not exist;
- `Invalid amount` — transfer amout not included or is below 0;
- `Overdraft prevented` — attemted to transfer more money than exists on the account.

### GET /all-currencies

Method responds with all currencies supported by backend at the moment:

```js
['ETH', 'BTC', 'USD'];
```

### GET /currencies

Method responds with all currencies of the user's account:

```js
{
	"AUD": {
		"amount": 22.16,
		"code": "AUD"
	},
	"BTC": {
		"amount": 3043.34,
		"code": "BTC"
	},
	"BYR": {
		"amount": 48.75,
		"code": "BYR"
	},
}
```

### POST /currency-buy

Method to exchange currencies.

Request body:

```js
{
  from, // code of the currency to be exchanged
    to, // code of the desired currency
    amount; // the amount to be exchanged, convertion happens on the server side based on the current rate
}
```

Mehtod responds with an array of objects of user's currencies (`/currencies`).

**Possible errors:**

- `Unknown currency code` — incorrect currency code (either code 'from' or 'to');
  `Invalid amount` — transaction amount not included or is below 0;
  `Not enough currency` — currency to be exchanged balance equals 0;
  `Overdraft prevented` — attemt to exchange more than exists on the balance.

### Websocket /currency-feed

Websocket-stream, that returns exhange rate changes.

Reponse:

```js
{
	"type":"EXCHANGE_RATE_CHANGE",
	"from":"NZD",
	"to":"CHF",
	"rate":62.79,
	"change":1
}
```

where:

- `type` — type of the message, used in order to filter it from other messages in case such should exist;
- `from` — currency code to exchange;
- `to` — currency code to exchange into;
- `rate` — exchange rate;
- `change` — exchange rate change in relation to previous rate: `1` — increase, `-1` — decrease, `0` — rate unchanged.

### GET /banks

Method returns a list of atm coordinates

```js
[
  { lat: 44.878414, lon: 39.190289 },
  { lat: 44.6098268, lon: 40.1006606 },
];
```
