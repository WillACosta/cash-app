import { AuthUser, baseUrl } from 'cypress/utils'

describe('Dashboard Component', () => {

  beforeEach(() => {
    cy.fixture<AuthUser>('auth_user').then((json) => {
      cy.login(json.email, json.password)
    })
  })

  it('should logout user if clicked on exit button', () => {
    cy.dataCy('logout-button').click()
    cy.url().should('eq', `${baseUrl}/auth/login`)
  })

  it('should click on transactions link and rediredct to Transactions route', () => {
    cy.dataCy('button-transactions').click()
    cy.url().should('eq', `${baseUrl}/transactions`)
  })

  it('should click on settings link and rediredct to Settings route', () => {
    cy.dataCy('button-settings').click()
    cy.url().should('eq', `${baseUrl}/settings`)
  })

  it('should click on dashboard link and rediredct to Dashboard route', () => {
    cy.dataCy('button-dashboard').click()
    cy.url().should('eq', `${baseUrl}/dashboard`)
  })
})
