/// <reference types="cypress" />

const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';

describe('Тестирование страницы конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');

    cy.wait('@getIngredients');
  });

  it('Отображение ингредиентов на странице', () => {
    cy.contains(BUN_NAME).should('exist');
    cy.contains(MAIN_NAME).should('exist');
  });

  it('Добавление булки по клику на кнопку Добавить', () => {
    cy.get('[data-cy="ingredient-bun"]')
      .contains(BUN_NAME)
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should('contain', BUN_NAME);
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', BUN_NAME);
  });

  it('Добавление начинки по клику на кнопку Добавить', () => {
    cy.get('[data-cy="ingredient-main"]')
      .contains(MAIN_NAME)
      .parent()
      .find('button')
      .click();

    cy.get('[data-cy="constructor-list"]').contains(MAIN_NAME).should('exist');
  });
  describe('Тестирование модальных окон ингредиентов', () => {
    beforeEach(() => {
      cy.contains(BUN_NAME).click();
    });

    it('Открытие модального окна при клике по ингредиенту', () => {
      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .and('contain', 'Детали ингредиента')
        .and('contain', BUN_NAME);
    });

    it('Закрытие модального окна кликом по крестику', () => {
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('Закрытие модального окна кликом по оверлею', () => {
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
  describe('Тестирование создания заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'mock-access-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');

      cy.intercept('GET', '**/api/auth/user', {
        fixture: 'user.json'
      }).as('getUser');

      cy.intercept('POST', '**/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      cy.visit('/');
      cy.wait('@getIngredients');
    });

    it('Полный сценарий оформления заказа: сборка, авторизация, отправка и очистка конструктора', () => {
      cy.get('[data-cy="ingredient-bun"]')
        .contains(BUN_NAME)
        .parent()
        .find('button')
        .click();

      cy.get('[data-cy="ingredient-main"]')
        .contains(MAIN_NAME)
        .parent()
        .find('button')
        .click();

      cy.get('button').contains('Оформить заказ').click();

      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible').and('contain', '105490');
      cy.get('[data-cy="modal-close"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
