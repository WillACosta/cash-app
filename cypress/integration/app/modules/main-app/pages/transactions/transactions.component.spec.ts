import { AuthUser, baseUrl } from "cypress/utils"

describe('Fluxo de Transações', () => {

  function fillInputWithCorrectValues() {
    cy.selectMaterialDropDown('type', 'Entrada')
    cy.selectMatCheckbox('isPayedOrReceived', 'Recebido')

    cy.dataCy('transaction-dialog-date').type(new Date().toLocaleDateString('pt-BR'))
    cy.dataCy('transaction-dialog-amount').type('50.23')
    cy.dataCy('transaction-dialog-description').type('Some description of this transaction')

    cy.dataCy('transaction-dialog-save').should('not.be.disabled')
  }

  context('Dado que acesso a página de transações', () => {
    beforeEach(() => {
      cy.fixture<AuthUser>('auth_user').then((json) => {
        cy.login(json.email, json.password)
      })

      cy.visit(`${baseUrl}/transactions`)
      cy.dataCy('new-transaction-button').click()
    })

    context('Quando clico no botão `Nova Transação`', () => {
      it('Então devo visualizar o modal para adicionar uma nova transação', () => {
        cy.dataCy('transaction-dialog').should('be.visible')
        cy.dataCy('transaction-dialog-title').children('h1').contains(
          'Nova Transação',
          { matchCase: false }
        )
      })
    })

    context('Quando interajo com o input de `Tipo` da transação', () => {
      it('Então devo selecionar alguma opção e marcar o checkbox relativo a ela', () => {
        cy.selectMaterialDropDown('type', 'Entrada')
        cy.selectMatCheckbox('isPayedOrReceived', 'Recebido')

        cy.selectMaterialDropDown('type', 'Saída')
        cy.selectMatCheckbox('isPayedOrReceived', 'Pago')
      })
    })

    context('Quando preencho os dados e clico em `Salvar`', () => {
      beforeEach(() => {
        fillInputWithCorrectValues()
        cy.dataCy('transaction-dialog-save').click()
      })

      it('Então sou redirecionado para a tela de `Transações` e vejo uma mensagem de sucesso', () => {
        cy.assertToastMessage('Transação salva com sucesso!')
        cy.dataCy('transaction-dialog').should('not.exist')
      })
    })

    context('Quando preencho os dados inválidos e clico em `Salvar`', () => {
      beforeEach(() => {
        cy.selectMaterialDropDown('type', 'Entrada')
        cy.selectMatCheckbox('isPayedOrReceived', 'Recebido')

        cy.dataCy('transaction-dialog-date').click()
        cy.dataCy('transaction-dialog-amount').click()
        cy.dataCy('transaction-dialog-description').click()
        cy.dataCy('transaction-dialog-save').click()
      })

      it('Então não devo ver a mensagem de sucesso', () => {
        cy.get('#toast-container').should('not.exist')
      })
    })

    context('Quando preencho os dados e clico em `Cancelar`', () => {
      beforeEach(() => {
        fillInputWithCorrectValues()
        cy.dataCy('transaction-dialog-cancel').click()
      })

      it('Então não desejo ver o modal de `Nova Transação` e nenhuma mensagem de sucesso ou erro', () => {
        cy.dataCy('transaction-dialog').should('not.exist')
        cy.get('#toast-container').should('not.exist')
      })
    })

  })
})