import { AuthUser, baseUrl } from "cypress/utils"

describe('Login Component', () => {

  it('should redirect to login page if user is not logged in', () => {
   cy.visit(baseUrl)
   cy.url().should('eq', `${baseUrl}/auth/login`)
  })

  it('should fill the form to sign the user and redirect to dashboard page', () => {
    cy.fixture<AuthUser>('auth_user').then(
      (json) => cy.login(json.email, json.password)
    )

    cy.url().should('eq', `${baseUrl}/dashboard`)
  })

  it('should display error message when user credentials are invalid', () => {
    const invalidEmail = 'any.user@reqres.in'

    cy.fixture<AuthUser>('auth_user').then(
      (json) => cy.login(invalidEmail, json.password)
    )

    cy.toastMessage('Não foi possível')
  })
})
