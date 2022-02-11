import { AuthUser, baseUrl } from 'cypress/utils'

describe('Navegação Entre as Funcionalidades', () => {

  context('Dado que acesso a Dashboard da aplicação', () => {
    beforeEach(() => {
      cy.fixture<AuthUser>('auth_user').then((json) => {
        cy.login(json.email, json.password)
      })
    })

    context('Quando clico no botão de `Sair`', () => {
      it('Então devo ser desconectado da aplicação e ser redirecionado para a tela de login', () => {
        cy.dataCy('logout-button').click()
        cy.url().should('eq', `${baseUrl}/auth/login`)
      })
    })

    context('Quando clico em cada um dos itens do menu lateral', () => {
      it('Então devo ser redirecionado para a tela de `Transações`', () => {
        cy.dataCy('button-transactions').click()
        cy.url().should('eq', `${baseUrl}/transactions`)
      })

      it('Então devo ser redirecionado para a tela de `Configurações`', () => {
        cy.dataCy('button-settings').click()
        cy.url().should('eq', `${baseUrl}/settings`)
      })

      it('Então devo ser redirecionado para a tela de `Dashboard`', () => {
        cy.dataCy('button-dashboard').click()
        cy.url().should('eq', `${baseUrl}/dashboard`)
      })
    })
  })
})
