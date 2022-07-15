describe('The SU resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  after(() => {
    cy.clearRefreshToken()
  })

  it('SU resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/#/data/stratigraphic_units')

    cy.get('[data-cy=collection-sus-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-su-card] .v-toolbar__title').contains('stratigraphic unit')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('stratigraphic unit')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-su-card] .v-toolbar__title').contains('stratigraphic unit')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=area-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=type-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=year-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=compiler-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=year-select-col] input').first().click().type('22{downArrow}{enter}')

    cy.get('[data-cy=area-select-col] input').first().click().type('w{downArrow}{enter}')

    cy.get('[data-cy=site-name-input]').should('have.value', 'Tell Wadi')
    cy.get('[data-cy=area-name-input]').should('have.value', 'A')

    cy.get('[data-cy=building-input-col]').click().type('b')

    cy.get('[data-cy=building-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=building-input-col]').click().type('{backspace}2')

    cy.get('[data-cy=building-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=building-phase-input-col]').click().type('1')

    cy.get('[data-cy=building-phase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=building-phase-input-col]').click().type('{backspace}b')

    cy.get('[data-cy=building-phase-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=room-input-col]').click().type('1')

    cy.get('[data-cy=room-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=room-input-col]').click().type('{backspace}X')

    cy.get('[data-cy=room-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=period-select-col]').click().type('ep{downArrow}{enter}')

    cy.get('[data-cy=period-select-col] input').should('have.value', 'EPN: Early Pottery Neolithic')

    cy.get('[data-cy=phase-input-col]').click().type('b')

    cy.get('[data-cy=phase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=phase-input-col] input').first().click().type('{backspace}2')

    cy.get('[data-cy=subphase-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=subphase-input-col]').click().type('1')

    cy.get('[data-cy=subphase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=subphase-input-col] input').first().click().type('{backspace}c')

    cy.get('[data-cy=subphase-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}x')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}9')

    cy.get('[data-cy=type-select-col]').click().type('cut{downArrow}{enter}')

    cy.get('[data-cy=type-select-col] input').should('have.value', 'cut')

    cy.get('[data-cy=preservation-select-col]').click().type('goo{downArrow}{enter}')

    cy.get('[data-cy=preservation-select-col] input').should('have.value', 'good')

    cy.get('[data-cy=su-description-input]').type('Some description')

    cy.get('[data-cy=su-summary-input]').type('Some summary')

    cy.get('[data-cy=su-interpretation-input]').type('Some interpretation')

    cy.get('[data-cy=top-elevation-col] input').type('n')

    cy.get('[data-cy=top-elevation-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=top-elevation-col] input').type('{backspace}180.90')

    cy.get('[data-cy=bottom-elevation-col] input').type('w')

    cy.get('[data-cy=bottom-elevation-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=bottom-elevation-col] input').type('{backspace}179.90')

    cy.get('[data-cy=bottom-elevation-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=compiler-select-col]').type('Some One')

    cy.get('[data-cy=area-supervisor-input]').type('The Supervisor')

    cy.intercept({method: 'post', path: '**/api/stratigraphic_units'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}1')

    cy.intercept({method: 'patch', path: '**/api/stratigraphic_units/*'}).as('failedUpdateRequest')

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

    cy.intercept({method: 'delete', path: '**/api/stratigraphic_units/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-sus-card]')

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

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('stratigraphic unit')

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

  it('SU media lifecycle', () => {
    cy.resetMedia()

    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/#/data/stratigraphic_units')

    cy.get('[data-cy=collection-sus-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=tab-images]').click()

    cy.get('[data-cy=tab-item-images]')

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=file-input]').selectFile('cypress/fixtures/kitten.jpg', {force: true})

    cy.intercept({method: 'post', path: '**/api/media_object_stratigraphic_units'}).as('successfulCreateRequest')

    cy.get('[data-cy=add-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=file-input]').selectFile('cypress/fixtures/kitten.jpg', {force: true})

    cy.get('[data-cy=add-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=cancel-btn]').click()


    cy.intercept({method: 'delete', path: '**/api/media_object_stratigraphic_units/*'}).as('successfulDeleteRequest')

    cy.get('[data-cy=media-object-card]')
      .last()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=file-input]').selectFile('cypress/fixtures/kitten.jpg', {force: true})

    cy.get('[data-cy=add-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

  })
})
