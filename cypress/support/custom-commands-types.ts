declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to perform a login
     *  @example cy.login('user@mail.com', '1234')
     */
    login(email: string, password: string): void;

    /**
     * Custom command to get Toastr Modal and assert Message
     * @example cy.toastMessage('Sorry, but there is an error.')
     */
    toastMessage(message: string): void;

    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    /**
     * Custom command to select DOM Mat Select by form control name and select an option by label.
     * @example cy.selectMaterialDropDown('userRole', 'admin')
     */
    selectMaterialDropDown(formControlName: string, selectOption: string): void

    /**
     * Custom command to select DOM Mat Checkbox by form control name and validate the label text.
     * @example cy.selectMatCheckbox('isActive', 'Inactive')
     */
    selectMatCheckbox(formControlName: string, label: string): void
  }
}
