describe('The Ecofact resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  it ('Ecofact resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/data/ecofacts')

    cy.get('[data-cy=collection-ecofacts-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-ecofact-card] .v-toolbar__title').contains('Ecofact')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('ecofact')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-ecofact-card] .v-toolbar__title').contains('Ecofact')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=su-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=type-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=su-select-col]').click().type('1{downArrow}{enter}')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}x')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}9')

    cy.get('[data-cy=quantity-input-col]').click().type('{backspace}z')

    cy.get('[data-cy=quantity-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=quantity-input-col]').click().type('{backspace}5')

    cy.get('[data-cy=type-select-col]').click().type('hu{downArrow}{enter}')

    cy.get('[data-cy=type-select-col] input').should('have.value', 'human bone')

    cy.get('[data-cy=preservation-state-select-col]').click().type('fa{downArrow}{enter}')

    cy.get('[data-cy=preservation-state-select-col] input').should('have.value', 'fair')

    cy.get('[data-cy=notes-input]').type('Some interesting note')

    cy.get('[data-cy=length-input-col] input').type('n')

    cy.get('[data-cy=length-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=length-input-col] input').type('{backspace}1.00')

    cy.get('[data-cy=height-input-col] input').type('n')

    cy.get('[data-cy=height-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=height-input-col] input').type('{backspace}2.00')

    cy.get('[data-cy=width-input-col] input').type('n')

    cy.get('[data-cy=width-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=width-input-col] input').type('{backspace}3.00')

    cy.get('[data-cy=thickness-input-col] input').type('n')

    cy.get('[data-cy=thickness-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=thickness-input-col] input').type('{backspace}4.00')

    cy.get('[data-cy=min-diameter-input-col] input').type('w')

    cy.get('[data-cy=min-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=min-diameter-input-col] input').type('{backspace}5.00')

    cy.get('[data-cy=max-diameter-input-col] input').type('c')

    cy.get('[data-cy=max-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=max-diameter-input-col] input').type('{backspace}6.00')

    cy.get('[data-cy=weight-input-col] input').type('c')

    cy.get('[data-cy=weight-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=weight-input-col] input').type('{backspace}7.00')

    cy.get('[data-cy=compiler-input]').type('Some One')

    cy.intercept({method: 'post', path: '**/api/ecofacts'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}1')

    cy.intercept({method: 'patch', path: '**/api/ecofacts/*'}).as('failedUpdateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@failedUpdateRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=number-input-col] input').type('{backspace}9')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=cancel-btn]').click()

    cy.get('@deleteResourceDialogCard').should('not.be.visible')

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/ecofacts/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-ecofacts-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'get', path: '**/api/ecofacts*'}).as('successfulGetCollectionRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.wait('@successfulGetCollectionRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('ecofact')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=site-navigation-chip]')
      .last()
      .click()

    cy.get('[data-cy=item-site-card] .v-toolbar__title').contains('Site')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=area-navigation-chip]')
      .last()
      .click()

    cy.get('[data-cy=item-area-card] .v-toolbar__title').contains('Area')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=stratigraphicUnit-navigation-chip]')
      .last()
      .click()

    cy.get('[data-cy=item-su-card] .v-toolbar__title').contains('stratigraphic unit')

  })
})
