import { environment } from "src/environments/environment.prod";

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('login', (email, password) => {
  cy.intercept('POST', `${environment.appApis.login}`).as('loginApi')
  cy.visit('/login')

  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)

  cy.get('[data-cy=login-button]').should('not.be.disabled')
  cy.get('[data-cy=login-button]').click()
  cy.wait('@loginApi')
})

