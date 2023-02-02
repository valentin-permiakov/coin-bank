/// <reference types="cypress" />

const testLogin = 'developer';
const testPassword = 'skillbox';
const testAccountNum = 4111111111111111;
const testTransferAmount = 2;

const tryLogin = (login, password) => {
  cy.get('input#login-name').type(login);
  cy.get('input#login-password').type(password);
  cy.get('button#login-btn').click();
};

describe('Coin Bank e2e Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    tryLogin(testLogin, testPassword);
    cy.get('a#logout-nav').should('be.visible');
  });

  it('Can log out and login again', () => {
    cy.get('a#logout-nav').click();
    cy.get('div.login-container').should('exist');
    tryLogin(testLogin, testPassword);
  });

  it('Login with wrong credentials is impossible', () => {
    cy.get('a#logout-nav').click();
    cy.get('div.login-container').should('exist');
    tryLogin('testLogin', 'testPassword');
    cy.get('span#login-form-error').should('have.length.greaterThan', 0);
  });

  it('After login app should show page with accounts', () => {
    cy.get('ul#cards-list')
      .find('li.cards-list__card-item')
      .should('have.length.greaterThan', 0);
  });

  it('Can add a new account and it appears on the screen', () => {
    cy.get('li.cards-list__card-item').then((accounts) => {
      const accountAmount = Cypress.$(accounts).length;
      cy.get('button').contains('Create New Account').click();
      cy.get('li.cards-list__card-item').should(
        'have.length',
        accountAmount + 1
      );
    });
  });

  it('Can send money to a different account and see transaction in the table below', () => {
    cy.get('li.cards-list__card-item:first-child').find('a').click();
    cy.get('div.card-details__money-transfer-container')
      .find('form')
      .should('exist');
    cy.get('input#transfer-account').type(testAccountNum);
    cy.get('input#transfer-amount').type(testTransferAmount);
    cy.get('input#transfer-account').click();
    cy.get('button').contains('Send').click();
    cy.get('div.card-details__money-transfer-container').contains(
      'Transfer Successful'
    );
    cy.get('table.account-history__table')
      .find('tr.history-table__body-row:first-child')
      .find('td.body-row__amount')
      .contains(`-${testTransferAmount}`);
  });

  it('Can exchange currencies', () => {
    cy.get('nav').contains('Currencies').click();
    cy.get('button#my-currencies-btn').click();
    cy.get('ul#my-currencies-list').contains('GBP').click();
    cy.get('button#all-currencies-btn').click();
    cy.get('ul#all-currencies-list').contains('NZD').click();
    cy.get('input#exchange-amount').type(0.4);
    cy.get('button').contains('Exchange').click();
    cy.get('div.exchange-section__exchange-container').contains(
      'Exchange Successful!'
    );
  });
});
