describe('The Cumulative Pottery Sheet resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  after(() => {
    cy.clearRefreshToken()
  })

  it ('Cumulative Pottery Sheet resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/#/data/cumulative_pottery_sheets')

    cy.get('[data-cy=collection-cps-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-cumulative-pottery-ware-card] .v-toolbar__title').contains('Cumulative Pottery Sheet')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('cumulative pottery sheet')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-cumulative-pottery-ware-card] .v-toolbar__title').contains('Cumulative Pottery Sheet')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=su-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=compiler-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=su-select-col]').click().type('4{downArrow}{enter}')

    cy.get('[data-cy=notes-input]').type('Some interesting note')

    cy.get('[data-cy=compiler-select-col]').type('Some One{downArrow}{enter}')

    cy.get('[data-cy=cwd-input-col] input').type('n')

    cy.get('[data-cy=cwd-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=cwd-input-col] input').type('{backspace}1')

    cy.get('[data-cy=cwd-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=kwnd-input-col] input').type('n')

    cy.get('[data-cy=kwnd-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=kwnd-input-col] input').type('{backspace}2')

    cy.get('[data-cy=kwnd-input-col] .v-messages__message').should('not.exist')

    cy.intercept({method: 'post', path: '**/api/cumulative_pottery_sheets'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-update-btn]').click()

    cy.intercept({method: 'get', path: '**/api/stratigraphic_units*'}).as('getSusRequest')

    cy.intercept({method: 'patch', path: '**/api/cumulative_pottery_sheets/*'}).as('failedUpdateRequest')

    cy.get('[data-cy=su-select-col]').click().type('1')

    cy.wait('@getSusRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=su-select-col]').click().type('{downArrow}{enter}')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@failedUpdateRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.intercept({method: 'get', path: '**/api/cumulative_pottery_sheets/*'}).as('successfulGetItemRequest')

    cy.get('[data-cy=cancel-btn]').click()

    cy.wait('@successfulGetItemRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=cancel-btn]').click()

    cy.get('@deleteResourceDialogCard').should('not.be.visible')

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/cumulative_pottery_sheets/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-cps-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'get', path: '**/api/cumulative_pottery_sheets*'}).as('successfulGetCollectionRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.wait('@successfulGetCollectionRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('cumulative pottery sheet')

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
