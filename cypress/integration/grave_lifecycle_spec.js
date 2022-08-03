describe('The Grave resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  after(() => {
    cy.clearRefreshToken()
  })

  it ('Grave resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.drawerNavigateToResource('grave')

    cy.get('[data-cy=collection-graves-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-grave-card] .v-toolbar__title').contains('Grave')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('grave')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-grave-card] .v-toolbar__title').contains('Grave')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=area-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=year-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=type-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=compiler-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=year-select-col] input').first().click().type('22{downArrow}{enter}')

    cy.get('[data-cy=area-select-col]').click().type('T{downArrow}{enter}')

    cy.get('[data-cy=building-input-col] input').first().click().type('a{downArrow}{enter}')

    cy.get('[data-cy=building-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=building-input-col] input').first().click().type('{backspace}2{downArrow}{enter}')

    cy.get('[data-cy=building-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=building-subphase-input-col] input').first().click().type('1{downArrow}{enter}')

    cy.get('[data-cy=building-subphase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=building-subphase-input-col] input').first().click().type('{backspace}D{downArrow}{enter}')

    cy.get('[data-cy=building-subphase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=building-subphase-input-col] input').first().click().type('{backspace}s{downArrow}{enter}')

    cy.get('[data-cy=building-subphase-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=room-input-col] input').first().click().type('9{downArrow}{enter}')

    cy.get('[data-cy=room-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=room-input-col] input').first().click().type('{backspace}z{downArrow}{enter}')

    cy.get('[data-cy=room-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=room-input-col] input').first().click().type('{backspace}XXXX{downArrow}{enter}')

    cy.get('[data-cy=room-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=room-input-col] input').first().click().type('{backspace}{backspace}{backspace}{enter}')

    cy.get('[data-cy=room-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}x')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}9')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=type-select-col] input').first().click().type('ch{downArrow}{enter}')

    cy.get('[data-cy=type-select-col] input').should('have.value', 'chamber')

    cy.get('[data-cy=ritual-select-col] input').first().click().type('inh{downArrow}{enter}')

    cy.get('[data-cy=ritual-select-col] input').should('have.value', 'inhumation')

    cy.get('[data-cy=deposition-select-col] input').first().click().type('p{downArrow}{enter}')

    cy.get('[data-cy=deposition-select-col] input').should('have.value', 'primary')

    cy.get('[data-cy=preservation-state-select-col] input').first().click().type('fa{downArrow}{enter}')

    cy.get('[data-cy=preservation-state-select-col] input').should('have.value', 'fair')

    cy.get('[data-cy=alignment-input]').type('NE')

    cy.get('[data-cy=period-select-col] input').first().click().type('ep{downArrow}{enter}')

    cy.get('[data-cy=period-select-col] input').should('have.value', 'EPN: Early Pottery Neolithic')

    cy.get('[data-cy=phase-input-col] input').first().click().type('b{downArrow}{enter}')

    cy.get('[data-cy=phase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=phase-input-col] input').first().click().type('{backspace}4{downArrow}{enter}')

    cy.get('[data-cy=phase-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=subphase-input-col] input').first().click().type('1{downArrow}{enter}')

    cy.get('[data-cy=subphase-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=subphase-input-col] input').first().click().type('{backspace}v{downArrow}{enter}')

    cy.get('[data-cy=subphase-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=compiler-select-col]').type('Some{downArrow}{enter}')

    cy.get('[data-cy=bottom-elevation-col] input').type('n')

    cy.get('[data-cy=bottom-elevation-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=bottom-elevation-col] input').type('{backspace}1.00')

    cy.get('[data-cy=top-elevation-col] input').type('n')

    cy.get('[data-cy=top-elevation-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=top-elevation-col] input').type('{backspace}2.00')

    cy.intercept({method: 'post', path: '**/api/graves'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-update-btn]').click()

    cy.intercept({method: 'patch', path: '**/api/graves/*'}).as('updateRequest')

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}1')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col] input').type('{backspace}9')

    cy.get('[data-cy=description-input]').type('Some description')

    cy.get('[data-cy=summary-input]').type('Some summary')

    cy.get('[data-cy=interpretation-input]').type('Some interpretation')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@updateRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.get('@deleteResourceDialogCard').find('[data-cy=cancel-btn]').click()

    cy.get('@deleteResourceDialogCard').should('not.be.visible')

    cy.get('[data-cy=resource-delete-btn]').click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/graves/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-graves-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'get', path: '**/api/graves*'}).as('successfulGetCollectionRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.wait('@successfulGetCollectionRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('grave')

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
