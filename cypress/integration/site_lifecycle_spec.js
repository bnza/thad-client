describe('The Site resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  it ('Site resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/data/sites')

    cy.get('[data-cy=collection-sites-card]')

    cy.intercept({method: 'get', path: '**/api/sites/*'}).as('getItemRequest')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.wait('@getItemRequest').its('response.statusCode').should('eq', 200)


    cy.get('[data-cy=item-site-card] .v-toolbar__title').contains('Site')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('site')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-site-card] .v-toolbar__title').contains('Site')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=site-code-input-col] input').type('zzzz')

    cy.get('[data-cy=site-code-input-col] input').should('have.value', 'ZZZZ')

    cy.get('[data-cy=site-code-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=site-code-input-col]').type('{backspace}')

    cy.get('[data-cy=site-code-input-col] .v-messages__message').should('be.hidden')

    cy.get('[data-cy=site-description-input]').type('The description of the site')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=site-name-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=site-name-input-col] input').type('ZZ site name')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=site-code-input-col] input').type('{backspace}{backspace}{backspace}ww{enter}')

    cy.intercept({method: 'patch', path: '**/api/sites/*'}).as('failedUpdateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@failedUpdateRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=site-code-input-col] input').type('{backspace}{backspace}wx{enter}')

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=cancel-btn]').click()

    cy.get('@deleteResourceDialogCard').should('not.be.visible')

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/sites/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-sites-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 500)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('site')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=site-navigation-chip]')
      .last()
      .click()

    cy.get('[data-cy=item-site-card] .v-toolbar__title').contains('Site')

  })
})
