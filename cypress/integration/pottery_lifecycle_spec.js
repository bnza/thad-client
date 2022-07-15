describe('The Pottery resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  after(() => {
    cy.clearRefreshToken()
  })

  it ('Pottery resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.visit('/#/data/potteries')

    cy.get('[data-cy=collection-potteries-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-pottery-card] .v-toolbar__title').contains('Pottery')

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('pottery')

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('edit')

    cy.get('[data-cy=cancel-btn]').click()

    cy.get('[data-cy=item-pottery-card] .v-toolbar__title').contains('Pottery')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()
    cy.get('[data-cy=pottery-select-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')
    cy.get('[data-cy=compiler-select-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=compiler-select-col]').type('Some One')

    cy.get('[data-cy=pottery-select-col]').click().type('1{downArrow}{enter}')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}x')

    cy.get('[data-cy=number-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=number-input-col]').click().type('{backspace}9')

    cy.get('[data-cy=period-select-col]').click().type('ep{downArrow}{enter}')

    cy.get('[data-cy=period-select-col] input').should('have.value', 'EPN: Early Pottery Neolithic')

    cy.get('[data-cy=vessel-shape-select-col]').click().type('ba{downArrow}{enter}')

    cy.get('[data-cy=vessel-shape-select-col] input').should('have.value', 'basin')

    cy.get('[data-cy=ware-select-col]').click().type('fi{downArrow}{enter}')

    cy.get('[data-cy=ware-select-col] input').should('have.value', 'fine')

    cy.get('[data-cy=preservation-select-col]').click().type('wa{downArrow}{enter}')

    cy.get('[data-cy=preservation-select-col] input').should('have.value', 'rim+wall')

    cy.get('[data-cy=ext-colour-select-col]').click().type('bl{downArrow}{enter}')

    cy.get('[data-cy=ext-colour-select-col] input').should('have.value', 'black')

    cy.get('[data-cy=int-colour-select-col]').click().type('bu{downArrow}{enter}')

    cy.get('[data-cy=int-colour-select-col] input').should('have.value', 'buff')

    cy.get('[data-cy=fracture-colour-select-col]').click().type('or{downArrow}{enter}')

    cy.get('[data-cy=fracture-colour-select-col] input').should('have.value', 'orange')

    cy.get('[data-cy=manufacturing-technique-select-col]').click().type('co{downArrow}{enter}')

    cy.get('[data-cy=manufacturing-technique-select-col] input').should('have.value', 'coil')

    cy.get('[data-cy=firing-select-col]').click().type('hi{downArrow}{enter}')

    cy.get('[data-cy=firing-select-col] input').should('have.value', 'high')

    cy.get('[data-cy=fabric-select-col]').click().type('ve{downArrow}{enter}')

    cy.get('[data-cy=fabric-select-col] input').should('have.value', 'mineral + vegetal inclusions')

    cy.get('[data-cy=surface-characteristic-select-col]').click().type('sl{downArrow}{downArrow}{enter}')

    cy.get('[data-cy=surface-characteristic-select-col] input').should('have.value', 'slip')

    cy.get('[data-cy=surface-treatment-select-col]').click().type('bi{downArrow}{enter}')

    cy.get('[data-cy=surface-treatment-select-col] input').should('have.value', 'bitumen')

    cy.get('[data-cy=decoration-select-col]').click().type('ex{downArrow}{enter}')

    cy.get('[data-cy=decoration-select-col] input').should('have.value', 'excised')

    cy.get('[data-cy=body-select-col]').click().type('inw{downArrow}{enter}')

    cy.get('[data-cy=body-select-col] input').should('have.value', 'inward wall')

    cy.get('[data-cy=spout-select-col]').click().type('co{downArrow}{enter}')

    cy.get('[data-cy=spout-select-col] input').should('have.value', 'conical')

    cy.get('[data-cy=handle-select-col]').click().type('kn{downArrow}{enter}')

    cy.get('[data-cy=handle-select-col] input').should('have.value', 'knob')

    cy.get('[data-cy=rim-shape-select-col]').click().type('fl{downArrow}{enter}')

    cy.get('[data-cy=rim-shape-select-col] input').should('have.value', 'flaring')

    cy.get('[data-cy=rim-characterization-select-col]').click().type('fl{downArrow}{enter}')

    cy.get('[data-cy=rim-characterization-select-col] input').should('have.value', 'flattened')

    cy.get('[data-cy=rim-direction-select-col]').click().type('ev{downArrow}{enter}')

    cy.get('[data-cy=rim-direction-select-col] input').should('have.value', 'everted')

    cy.get('[data-cy=neck-select-col]').click().type('ver{downArrow}{enter}')

    cy.get('[data-cy=neck-select-col] input').should('have.value', 'vertical')

    cy.get('[data-cy=neck-length-select-col]').click().type('{downArrow}{enter}')

    cy.get('[data-cy=neck-length-select-col] input').should('have.value', 'long')

    cy.get('[data-cy=base-shape-select-col]').click().type('di{downArrow}{enter}')

    cy.get('[data-cy=base-shape-select-col] input').should('have.value', 'disc')

    cy.get('[data-cy=size-group-select-col]').click().type('1{downArrow}{enter}')

    cy.get('[data-cy=size-group-select-col] input').should('have.value', '≤ 10 cm')

    cy.get('[data-cy=note-input]').type('Some interesting note')

    cy.get('[data-cy=thickness-input-col] input').type('n')

    cy.get('[data-cy=thickness-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=thickness-input-col] input').type('{backspace}1.93')

    cy.get('[data-cy=rim-diameter-input-col] input').type('w')

    cy.get('[data-cy=rim-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=rim-diameter-input-col] input').type('{backspace}5.17')

    cy.get('[data-cy=base-diameter-input-col] input').type('c')

    cy.get('[data-cy=base-diameter-input-col] .v-messages__message').should('be.visible')

    cy.get('[data-cy=base-diameter-input-col] input').type('{backspace}3.24')

    cy.intercept({method: 'post', path: '**/api/potteries'}).as('successfulCreateRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@successfulCreateRequest').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=resource-update-btn]').click()

    cy.get('[data-cy=number-input-col]').type('{backspace}{backspace}1')

    cy.intercept({method: 'patch', path: '**/api/potteries/*'}).as('failedUpdateRequest')

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

    cy.intercept({method: 'delete', path: '**/api/potteries/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=collection-potteries-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-delete-btn]')
      .click()

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'get', path: '**/api/potteries*'}).as('successfulGetCollectionRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

    cy.wait('@successfulGetCollectionRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-update-btn]')
      .click()

    cy.get('[data-cy=action-resource-card] .v-toolbar__title').contains('pottery')

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
