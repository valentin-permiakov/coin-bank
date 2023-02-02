import { el } from 'redom';
import { router } from '../utils/routing';

const renderHeader = () => {
  const header = el(
    'header.header#header',
    el('div.container.header__container', el('h1.header__logo', 'Coin.'))
  );

  const headerNav = el(
    'nav.header__nav',
    el('ul.header__nav-list.list-reset', [
      el(
        'li.nav-list__item',
        el('a.nav-item__link#atms-nav', { href: '/atms' }, 'ATMs')
      ),
      el(
        'li.nav-list__item',
        el(
          'a.nav-item__link.nav-item__link--active#accounts-nav',
          {
            href: '/accounts',
          },
          'Accounts'
        )
      ),
      el(
        'li.nav-list__item',
        el('a.nav-item__link#exchange-nav', { href: '/exchange' }, 'Currencies')
      ),
      el(
        'li.nav-list__item',
        el('a.nav-item__link#logout-nav', { href: '/' }, 'Logout')
      ),
    ])
  );

  const navItems = Array.from(headerNav.childNodes[0].childNodes);
  navItems.forEach((item) => {
    item.childNodes[0].addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate(e.target.getAttribute('href'));
      navItems.forEach((item) => {
        item.childNodes[0].classList.remove('nav-item__link--active');
      });
      item.childNodes[0].classList.add('nav-item__link--active');
    });
  });

  const burger = el(
    'div.header__burger-container',
    {
      onclick() {
        this.classList.toggle('header__burger-container--opened');
        document
          .querySelector('.header__nav')
          .classList.toggle('header__nav--visible');
      },
    },
    [
      el('span.header__burger-span'),
      el('span.header__burger-span'),
      el('span.header__burger-span'),
    ]
  );

  header.append(burger);

  header.children[0].append(headerNav);

  document.body.prepend(header);
  return { header, headerNav, burger };
};

export { renderHeader as default };
