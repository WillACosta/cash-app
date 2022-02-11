import { environment } from "src/environments/environment";

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`)
})

Cypress.Commands.add('assertToastMessage', (message) => {
  cy.get('.toast-message').contains(message)
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

Cypress.Commands.add(
  "selectMaterialDropDown",
  (formControlName, selectOption) => {
    cy.get(`[formcontrolname="${formControlName}"]`)
      .click()
      .then(() => {
        cy.get(
          `.cdk-overlay-container .mat-select-panel .mat-option-text`
        ).should("contain", selectOption)

        cy.get(
          `.cdk-overlay-container .mat-select-panel .mat-option-text:contains("${selectOption}")`
        )
          .first()
          .click()
          .then(() => {
            cy.get(`[formcontrolname="${formControlName}"]`).contains(
              selectOption
            )
          })
      })
  }
)

Cypress.Commands.add("selectMatCheckbox", (formControlName, label) => {
  const formSelector = `mat-checkbox[formcontrolname="${formControlName}"]`

  cy.get(formSelector)
    .click()
    .then(() => {
      cy.get(`${formSelector} > .mat-checkbox-layout > .mat-checkbox-label`)
        .contains(label, { matchCase: false })
    })
})

