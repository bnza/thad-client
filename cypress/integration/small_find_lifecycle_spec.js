describe('The Small Find resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  it ('Small Find resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/#/data/small_finds')

    cy.get('[data-cy=collection-small-finds-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-small-find-card] .v-toolbar__title').contains('Small Find')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('small find')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-small-find-card] .v-toolbar__title').contains('Small Find')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=su-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=type-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=material-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=preservation-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=compiler-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=compiler-select-col]').type('Some One')

    cy.get('[data-cy=su-select-col]').click().type('1{downArrow}{enter}')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}x')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}9')

    cy.get('[data-cy=type-select-col]').click().type('bl{downArrow}{enter}')

    cy.get('[data-cy=type-select-col] input').should('have.value', 'blade')

    cy.get('[data-cy=material-select-col]').click().type('cop{downArrow}{enter}')

    cy.get('[data-cy=material-select-col] input').should('have.value', 'copper')

    cy.get('[data-cy=preservation-select-col]').click().type('com{downArrow}{enter}')

    cy.get('[data-cy=preservation-select-col] input').should('have.value', 'complete')

    cy.get('[data-cy=preservation-state-select-col]').click().type('fa{downArrow}{enter}')

    cy.get('[data-cy=preservation-state-select-col] input').should('have.value', 'fair')

    cy.get('[data-cy=ext-colour-select-col]').click().type('bl{downArrow}{enter}')

    cy.get('[data-cy=ext-colour-select-col] input').should('have.value', 'black')

    cy.get('[data-cy=int-colour-select-col]').click().type('bu{downArrow}{enter}')

    cy.get('[data-cy=int-colour-select-col] input').should('have.value', 'buff')

    cy.get('[data-cy=fracture-colour-select-col]').click().type('or{downArrow}{enter}')

    cy.get('[data-cy=fracture-colour-select-col] input').should('have.value', 'orange')

    cy.get('[data-cy=length-input-col] input').type('n')

    cy.get('[data-cy=length-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=length-input-col] input').type('{backspace}1.00')

    cy.get('[data-cy=height-input-col] input').type('n')

    cy.get('[data-cy=height-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=height-input-col] input').type('{backspace}2.00')

    cy.get('[data-cy=thickness-input-col] input').type('n')

    cy.get('[data-cy=thickness-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=thickness-input-col] input').type('{backspace}3.00')

    cy.get('[data-cy=weight-input-col] input').type('c')

    cy.get('[data-cy=weight-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=weight-input-col] input').type('{backspace}4.00')

    cy.get('[data-cy=width-input-col] input').type('n')

    cy.get('[data-cy=width-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=width-input-col] input').type('{backspace}5.00')

    cy.get('[data-cy=min-width-input-col] input').type('n')

    cy.get('[data-cy=min-width-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=min-width-input-col] input').type('{backspace}6.00')

    cy.get('[data-cy=max-width-input-col] input').type('f')

    cy.get('[data-cy=max-width-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=max-width-input-col] input').type('{backspace}7')

    cy.get('[data-cy=max-width-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=max-width-input-col] input').type('{backspace}3')

    cy.get('[data-cy=max-width-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=max-width-input-col] input').type('{backspace}7.00')

    cy.get('[data-cy=base-diameter-input-col] input').type('n')

    cy.get('[data-cy=base-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=base-diameter-input-col] input').type('{backspace}8.00')

    cy.get('[data-cy=min-diameter-input-col] input').type('w')

    cy.get('[data-cy=min-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=min-diameter-input-col] input').type('{backspace}9.00')

    cy.get('[data-cy=max-diameter-input-col] input').type('c')

    cy.get('[data-cy=max-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=max-diameter-input-col] input').type('{backspace}10')

    cy.get('[data-cy=max-diameter-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=max-diameter-input-col] input').type('{backspace}{backspace}3')

    cy.get('[data-cy=max-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=max-diameter-input-col] input').type('{backspace}10.00')

    cy.get('[data-cy=description-input]').type('The long and accurate description of the object')

    cy.get('[data-cy=summary-input]').type('A brief description')

    cy.get('[data-cy=notes-input]').type('Some interesting note')

    cy.intercept({method: 'post', path: '**/api/small_finds'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}{backspace}1')

    cy.intercept({method: 'patch', path: '**/api/small_finds/*'}).as('failedUpdateRequest')

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

    cy.intercept({method: 'delete', path: '**/api/small_finds/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-small-finds-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'get', path: '**/api/small_finds*'}).as('successfulGetCollectionRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.wait('@successfulGetCollectionRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('small find')

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
