import { el } from 'redom';
import { createNewCard, getClientData } from '../utils/api';
import CardAccount from '../utils/cardAccountClass';
import renderSortList from '../utils/renderSortList';
import sortCardsList from '../utils/sortCards';
import { router } from '../utils/routing';

const createAccountCard = (data) => {
  const card = el('li.cards-list__card-item ', { id: data.account }, [
    el('h3.card-item__header.card-item--sorting', data.account),
    el('span.card-item__balance.card-item--sorting', data.balance),
    el('div.card-item__bottom', [
      el('div.card-bottom__transaction-container', [
        el('h4.transaction__heading', 'Last Transaction:'),
        el('span.transaction__date.card-item--sorting', data.formatDate()),
      ]),
      el(
        'a.card-bottom__open-link',
        {
          href: `/account/${data.account}`,
          onclick(e) {
            e.preventDefault();
            router.navigate(e.target.getAttribute('href'));
          },
        },
        'Details'
      ),
    ]),
  ]);
  return card;
};

const renderAccountsPage = async (token) => {
  const container = el('div.container', [
    el('div.cards-section__top', [
      el(
        'div.cards-top__left',
        el('h2.cards-top__header.section-header', 'Your Accounts')
      ),
      el(
        'button.cards-top__new-acc-btn.btn-reset',
        {
          async onclick(e) {
            e.preventDefault();
            try {
              this.classList.add('button--loading');
              const account = await createNewCard(token);
              const card = new CardAccount(account);
              document
                .getElementById('cards-list')
                .append(createAccountCard(card));
            } catch (error) {
              console.log(error);
            } finally {
              this.classList.remove('button--loading');
            }
          },
        },
        'Create New Account'
      ),
    ]),
  ]);
  const cardsList = el('ul.cards-section__cards-list.list-reset#cards-list');
  const clientData = await getClientData(token);
  const sortList = renderSortList();
  clientData.forEach((account) => {
    const card = new CardAccount(account);
    cardsList.append(createAccountCard(card));
  });
  container.append(cardsList);
  container.children[0].children[0].append(sortList.container);
  sortCardsList(cardsList, sortList.types);

  return container;
};

export { renderAccountsPage as default };
