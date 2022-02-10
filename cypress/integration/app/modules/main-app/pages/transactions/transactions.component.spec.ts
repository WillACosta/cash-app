import { AuthUser, baseUrl } from "cypress/utils"

context('Funcionality: Transactions Flow', () => {
  describe('Transactions Component', () => {

    beforeEach(() => {
      cy.fixture<AuthUser>('auth_user').then((json) => {
        cy.login(json.email, json.password)
      })
    })

    describe('New Transaction Flow', () => {
      beforeEach(() => {
        cy.visit(`${baseUrl}/transactions`)
        cy.dataCy('new-transaction-button').click()
      })

      it('should click on `New Transaction` button and open new transaction dialog', () => {
        cy.dataCy('transaction-dialog').should('be.visible')
        cy.dataCy('transaction-dialog-title').children('h1').contains(
          'Nova Transação',
          { matchCase: false }
        )
      })

      it('should interact with transaction type select', () => {
        cy.selectMaterialDropDown('type', 'Entrada')
        cy.selectMatCheckbox('isPayedOrReceived', 'Recebido')

        cy.selectMaterialDropDown('type', 'Saída')
        cy.selectMatCheckbox('isPayedOrReceived', 'Pago')
      });

      xit('should fill all values in the dialog and `save` button must be enabled [SUCCESS CASE]', () => {
        cy.selectMaterialDropDown('type', 'Entrada')
        cy.selectMatCheckbox('isPayedOrReceived', 'Recebido')

        cy.dataCy('transaction-dialog-date').type(new Date().toLocaleDateString('pt-BR'))
        cy.dataCy('transaction-dialog-amount').type('50.23')
        cy.dataCy('transaction-dialog-description').type('Some description of this transaction')

        cy.dataCy('loading-button').should('not.be.visible')

        cy.dataCy('transaction-dialog-save').should('not.be.disabled')
        cy.dataCy('transaction-dialog-save').click()

        cy.dataCy('loading-button').should('be.visible')

        cy.dataCy('transaction-dialog').should('not.be.visible')
        cy.toastMessage('Transação salva com sucesso!')
      })

    })

  })
})

