import '../css/style.css';
import { el, setChildren } from 'redom';
import renderHeader from './components/header';
import { renderLogin, formSubmit } from './components/login';
import renderAccountsPage from './components/accounts';
import renderAccountDetails from './components/accountDetails';
import renderAccountHistory from './components/accountHistory';
import renderExchangePage from './components/currencyExchange';
import renderAtmMap from './components/atms';
import {
  fetchLogin,
  getAccountCurrencies,
  getAccountDetails,
  getAllCurrencies,
} from './utils/api';
import { router } from './utils/routing';
import navBarSwitch from './utils/navBarSwitch';
import renderError from './utils/renderError';
import {
  renderCardsSkeleton,
  renderDetailsSkeleton,
  renderHistorySkeleton,
  renderExchangeSkeleton,
  renderAtmsSkeleton,
} from './utils/renderSkeletons';

export const main = el('main');

const loginForm = renderLogin();
const header = renderHeader();

document.body.append(main);
setChildren(main, loginForm.container);

loginForm.loginForm.addEventListener('submit', (e) => {
  const isLogin = formSubmit(e);
  if (isLogin?.nameInputValue) {
    document.getElementById('login-btn').classList.add('button--loading');
    fetchLogin(isLogin.nameInputValue, isLogin.passwordInputValue).then(
      (data) => {
        if (data === 'No such user' || data === 'Invalid password') {
          loginForm.errorSpan.textContent = data;
          document
            .getElementById('login-btn')
            .classList.remove('button--loading');
        } else {
          sessionStorage.setItem('userToken', data);
          document
            .getElementById('login-btn')
            .classList.remove('button--loading');
          router.navigate('/accounts');
        }
      }
    );
  }
});

router.on('/', () => {
  header.headerNav.classList.remove(
    'header__nav--active',
    'header__nav--visible'
  );
  header.burger.classList.add('header__burger-container--hidden');
  header.burger.classList.remove('header__burger-container--opened');
  sessionStorage.clear();
  setChildren(main, loginForm.container);
});

router.on('/accounts', async () => {
  if (sessionStorage.getItem('userToken')) {
    header.headerNav.classList.add('header__nav--active');
    header.headerNav.classList.remove('header__nav--visible');
    header.burger.classList.remove(
      'header__burger-container--hidden',
      'header__burger-container--opened'
    );
    const navItems = Array.from(document.querySelectorAll('.nav-item__link'));
    const currentLink = document.getElementById('accounts-nav');
    navBarSwitch(navItems, currentLink);
    setChildren(main, renderCardsSkeleton());

    try {
      const accountsPage = await renderAccountsPage(
        sessionStorage.getItem('userToken')
      );
      setChildren(main, accountsPage);
    } catch (error) {
      setChildren(main, renderError(error.message));
    }
  } else {
    loginForm.errorSpan.textContent = 'You need to login again';
    setChildren(main, renderError('You need to login again'));
    setTimeout(() => {
      router.navigate('/');
    }, 1500);
  }
});

router.on('/account/:id', async ({ data: { id } }) => {
  if (sessionStorage.getItem('userToken')) {
    header.headerNav.classList.add('header__nav--active');
    header.headerNav.classList.remove('header__nav--visible');
    header.burger.classList.remove(
      'header__burger-container--hidden',
      'header__burger-container--opened'
    );
    setChildren(main, renderDetailsSkeleton());

    try {
      const accountData = await getAccountDetails(
        sessionStorage.getItem('userToken'),
        id
      );
      const accountDetails = renderAccountDetails(accountData);
      document
        .getElementById('accounts-nav')
        .classList.remove('nav-item__link--active');
      setChildren(main, accountDetails);
    } catch (error) {
      setChildren(main, renderError(error.message));
    }
  } else {
    loginForm.errorSpan.textContent = 'You need to login again';
    setChildren(main, renderError('You need to login again'));
    setTimeout(() => {
      router.navigate('/');
    }, 1500);
  }
});

router.on('/account/:id/history', async ({ data: { id } }) => {
  if (sessionStorage.getItem('userToken')) {
    header.headerNav.classList.add('header__nav--active');
    header.headerNav.classList.remove('header__nav--visible');
    header.burger.classList.remove(
      'header__burger-container--hidden',
      'header__burger-container--opened'
    );
    setChildren(main, renderHistorySkeleton());

    try {
      const accountData = await getAccountDetails(
        sessionStorage.getItem('userToken'),
        id
      );
      const accountHistory = renderAccountHistory(accountData);
      setChildren(main, accountHistory);
    } catch (error) {
      setChildren(main, renderError(error.message));
    }
  } else {
    loginForm.errorSpan.textContent = 'You need to login again';
    setChildren(main, renderError('You need to login again'));
    setTimeout(() => {
      router.navigate('/');
    }, 1500);
  }
});

router.on('/exchange', async () => {
  if (sessionStorage.getItem('userToken')) {
    header.headerNav.classList.add('header__nav--active');
    header.headerNav.classList.remove('header__nav--visible');
    header.burger.classList.remove(
      'header__burger-container--hidden',
      'header__burger-container--opened'
    );
    const navItems = Array.from(document.querySelectorAll('.nav-item__link'));
    const currentLink = document.getElementById('exchange-nav');
    navBarSwitch(navItems, currentLink);
    setChildren(main, renderExchangeSkeleton());

    try {
      const accountCurrencies = await getAccountCurrencies(
        sessionStorage.getItem('userToken')
      );
      const allCurrencies = await getAllCurrencies(
        sessionStorage.getItem('userToken')
      );
      const currencyExchange = renderExchangePage(
        accountCurrencies,
        allCurrencies
      );
      setChildren(main, currencyExchange);
    } catch (error) {
      setChildren(main, renderError(error.message));
    }
  } else {
    loginForm.errorSpan.textContent = 'You need to login again';
    setChildren(main, renderError('You need to login again'));
    setTimeout(() => {
      router.navigate('/');
    }, 1500);
  }
});

router.on('/atms', async () => {
  header.headerNav.classList.add('header__nav--active');
  header.headerNav.classList.remove('header__nav--visible');
  header.burger.classList.remove(
    'header__burger-container--hidden',
    'header__burger-container--opened'
  );
  const navItems = Array.from(document.querySelectorAll('.nav-item__link'));
  const currentLink = document.getElementById('atms-nav');
  navBarSwitch(navItems, currentLink);
  setChildren(main, renderAtmsSkeleton());

  try {
    const mapSection = await renderAtmMap();
    setChildren(main, mapSection);
  } catch (error) {
    setChildren(main, renderError(error.message));
  }
});

router.resolve();
