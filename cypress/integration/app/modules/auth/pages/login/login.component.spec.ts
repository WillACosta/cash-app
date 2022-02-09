describe('Login Component', () => {
  const userEmail = 'eve.holt@reqres.in'
  const userPassword = '1234'
  const baseUrl = `${Cypress.config().baseUrl}`

  it('should redirect to login page if user is not logged in', () => {
   cy.visit(baseUrl)
   cy.url().should('eq', `${baseUrl}/auth/login`)
  })

  it('should fill the form to sign the user and redirect to dashboard page', () => {
    cy.login(userEmail, userPassword)
    cy.url().should('eq', `${baseUrl}/dashboard`)
  })

  it('should display error message when user credentials are invalid', () => {
    const userEmail = 'any.user@reqres.in'
    cy.login(userEmail, userPassword)

    cy.get('.toast-message').contains('Não foi possível')
  })
})
