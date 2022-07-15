describe('The Document resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  it ('Document resource lifecycle (admin)', () => {

    cy.resetMedia()

    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.drawerNavigateToResource('document')

    cy.get('[data-cy=collection-documents-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-document-card] .v-toolbar__title').contains('Document')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('document')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-document-card] .v-toolbar__title').contains('Document')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=area-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=year-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=type-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=interpretation-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=description-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=file-input-card] .v-messages__message').should('be.visible')
    cy.get('[data-cy=creator-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=file-input]').selectFile('cypress/fixtures/kitten100.jpg', {force: true})
    cy.get('[data-cy=file-input-card] .v-messages__message').should('not.exist')

    cy.get('[data-cy=year-select-col] input').first().click().type('22{downArrow}{enter}')

    cy.get('[data-cy=area-select-col]').click().type('T{downArrow}{enter}')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}x')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col]').type('{backspace}9')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=type-select-col] input').first().click().type('sk{downArrow}{enter}')

    cy.get('[data-cy=type-select-col] input').should('have.value', 'sketch')

    cy.get('[data-cy=creator-select-col]').type('Some{downArrow}{enter}')

    cy.get('[data-cy=number-input-col] input').type('{backspace}5')

    cy.get('[data-cy=description-select-col]').type('Some summary')

    cy.get('[data-cy=interpretation-select-col]').type('Some description')

    cy.get('[data-cy=summary-input]').type('Some summary')

    cy.intercept({method: 'post', path: '**/api/documents'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=item-document-card]')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.intercept({method: 'patch', path: '**/api/documents/*'}).as('failedUpdateRequest')

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}1')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@failedUpdateRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=cancel-btn]').click()

    cy.get('@deleteResourceDialogCard').should('not.be.visible')

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/documents/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-documents-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'get', path: '**/api/documents*'}).as('successfulGetCollectionRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.wait('@successfulGetCollectionRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('document')

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

  })
})
