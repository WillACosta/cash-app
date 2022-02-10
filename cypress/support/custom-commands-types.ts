declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to perform a login
     */
    login(email: string, password: string): void;

    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;
  }
}
