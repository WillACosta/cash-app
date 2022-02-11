import { AuthUser, baseUrl } from "cypress/utils"

describe('Login Usuário', () => {
  context('Dado que acesso a página inicial da aplicação', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    context('Quando não estou logado', () => {
      it('Então sou redirecionado para a tela de login', () => {
        cy.url().should('eq', `${baseUrl}/auth/login`)
      })
    })

    context('Quando digito minhas credenciais e clico em `Entrar`', () => {
      beforeEach(() => {
        cy.fixture<AuthUser>('auth_user').then(
          (json) => cy.login(json.email, json.password)
        )
      })

      it('Então sou redirecionado para a tela de `Dashboard`', () => {
        cy.url().should('eq', `${baseUrl}/dashboard`)
      })
    })

    context('Quando digito minhas credenciais inválidas e clico em `Entrar`', () => {
      beforeEach(() => {
        const invalidEmail = 'any.user@reqres.in'
        cy.fixture<AuthUser>('auth_user').then(
          (json) => cy.login(invalidEmail, json.password)
        )
      })

      it('Então vejo uma mensagem de erro no canto superior da tela', () => {
        cy.assertToastMessage('Não foi possível')
      })
    })
  })
})
