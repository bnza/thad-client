describe('The Area resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  after(() => {
    cy.clearRefreshToken()
  })

  it ('Area resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/#/data/areas')

    cy.get('[data-cy=collection-areas-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-area-card] .v-toolbar__title').contains('Area')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('area')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-area-card] .v-toolbar__title').contains('Area')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=site-select-col]').click().type('w{downArrow}{enter}')

    cy.get('[data-cy=site-name-input]').click().should('have.value', 'Tell Wadi')

    cy.get('[data-cy=area-code-input-col] input').type('xxxx')

    cy.get('[data-cy=area-code-input-col] input').should('have.value', 'XXXX')

    cy.get('[data-cy=area-code-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=area-code-input-col] input').type('{backspace}{backspace}')

    cy.get('[data-cy=area-code-input-col] .v-messages__message').should('be.hidden')

    cy.get('[data-cy=area-description-input]').type('The description of the area')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=area-name-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=area-name-input-col] input').type('XX area name')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=resource-update-btn]').click()

    cy.intercept({method: 'patch', path: '**/api/areas/*'}).as('failedUpdateRequest')

    cy.get('[data-cy=area-code-input-col] input').type('{backspace}{backspace}{backspace}{backspace}a')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@failedUpdateRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=area-code-input-col] input').type('{backspace}{backspace}na')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=cancel-btn]').click()

    cy.get('@deleteResourceDialogCard').should('not.be.visible')

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/areas/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-areas-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('area')

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

  })
})
