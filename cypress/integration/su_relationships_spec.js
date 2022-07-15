describe('The SU relationship lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })

  after(() => {
    cy.clearRefreshToken()
  })

  it('SU stratigraphic relationships lifecycle (editor)', () => {

    cy.viewport(1280, 800)

    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.drawerNavigateToResource('stratigraphicUnit')

    cy.get('[data-cy=collection-sus-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-su-card]')

    cy.get('[data-cy=tab-rels]').click()

    cy.get('[data-cy=collection-su-st-rel-container]')

    cy.get('[data-cy=collection-su-st-row]').find('[data-cy=create-su-rel-btn]').should('not.exist')

    cy.get('[data-cy=item-rel-chip] button').should('not.exist')

    cy.get('[data-cy=su-st-enable-editing-btn]').click()

    cy.get('[data-cy=collection-su-st-row]').find('[data-cy=create-su-rel-btn]').eq(1).click()

    cy.get('[data-cy=create-su-rel-card]').should('be.visible')

    cy.get('[data-cy=dx-su-input]').click().type('5{downArrow}{enter}')

    cy.intercept({method: 'post', path: '**/api/stratigraphic_relationships'}).as('createStratigraphicRelationship')

    cy.get('[data-cy=create-su-rel-card]').find('[data-cy=submit-btn]').click()

    cy.wait('@createStratigraphicRelationship').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=collection-su-st-row]').find('[data-cy=create-su-rel-btn]').eq(1).click()

    cy.get('[data-cy=create-su-rel-card]').should('be.visible')

    cy.get('[data-cy=dx-su-input]').click().type('5{downArrow}{enter}')

    cy.get('[data-cy=create-su-rel-card]').find('[data-cy=submit-btn]').click()

    cy.wait('@createStratigraphicRelationship').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=create-su-rel-card]').find('[data-cy=cancel-btn]').click()

    cy.intercept({method: 'get', path: '**/api/stratigraphic_units/*'}).as('getStratigraphicUnit')

    cy.get('[data-cy=collection-su-st-row]')
      .find('[data-cy=collection-su-rel-card]')
      .eq(1)
      .find('[data-cy=item-rel-chip]')
      .first()
      .click('left')

    cy.get('[data-cy=sub-item-read]')

    cy.wait('@getStratigraphicUnit').its('response.statusCode').should('eq', 200)

    cy.intercept({method: 'delete', path: '**/api/stratigraphic_relationships/*'}).as('deleteStratigraphicRelationship')

    cy.get('[data-cy=collection-su-st-row]')
      .find('[data-cy=collection-su-rel-card]')
      .eq(1)
      .find('[data-cy=item-rel-chip] button')
      .first()
      .click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@deleteStratigraphicRelationship').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=su-st-enable-editing-btn]').click()

    cy.get('[data-cy=collection-su-st-row]').find('[data-cy=create-su-rel-btn]').should('not.exist')

    cy.get('[data-cy=item-rel-chip] button').should('not.exist')

  })

  it('SU stratigraphic sequence lifecycle (editor)', () => {

    cy.viewport(1280, 800)

    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.drawerNavigateToResource('stratigraphicUnit')

    cy.get('[data-cy=collection-sus-card]')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-su-card]')

    cy.get('[data-cy=tab-rels]').click()

    cy.get('[data-cy=collection-su-seq-rel-container]')

    cy.get('[data-cy=collection-su-seq-row]').find('[data-cy=create-su-rel-btn]').should('not.exist')

    cy.get('[data-cy=item-su-seq-chip] button').should('not.exist')

    cy.get('[data-cy=su-seq-enable-editing-btn]').click()

    cy.get('[data-cy=collection-su-seq-row]').find('[data-cy=create-su-rel-btn]').eq(1).click()

    cy.get('[data-cy=create-su-rel-card]').should('be.visible')

    cy.get('[data-cy=dx-su-input]').click().type('5{downArrow}{enter}')

    cy.intercept({method: 'post', path: '**/api/stratigraphic_sequences'}).as('createStratigraphicSequence')

    cy.get('[data-cy=create-su-rel-card]').find('[data-cy=submit-btn]').click()

    cy.wait('@createStratigraphicSequence').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=collection-su-seq-row]').find('[data-cy=create-su-rel-btn]').eq(1).click()

    cy.get('[data-cy=create-su-rel-card]').should('be.visible')

    cy.get('[data-cy=dx-su-input]').click().type('5{downArrow}{enter}')

    cy.get('[data-cy=create-su-rel-card]').find('[data-cy=submit-btn]').click()

    cy.wait('@createStratigraphicSequence').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=create-su-rel-card]').find('[data-cy=cancel-btn]').click()

    cy.intercept({method: 'get', path: '**/api/stratigraphic_units/*'}).as('getStratigraphicUnit')

    cy.get('[data-cy=collection-su-seq-row]')
      .find('[data-cy=collection-su-rel-card]')
      .eq(1)
      .find('[data-cy=item-rel-chip]')
      .first()
      .click('left')

    cy.get('[data-cy=sub-item-read]')

    cy.wait('@getStratigraphicUnit').its('response.statusCode').should('eq', 200)

    cy.intercept({method: 'delete', path: '**/api/stratigraphic_sequences/*'}).as('deleteStratigraphicSequence')

    cy.get('[data-cy=collection-su-seq-row]')
      .find('[data-cy=collection-su-rel-card]')
      .eq(1)
      .find('[data-cy=item-rel-chip] button')
      .first()
      .click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@deleteStratigraphicSequence').its('response.statusCode').should('eq', 204)

    cy.get('[data-cy=su-seq-enable-editing-btn]').click()

    cy.get('[data-cy=collection-su-seq-row]').find('[data-cy=create-su-rel-btn]').should('not.exist')

    cy.get('[data-cy=item-rel-chip] button').should('not.exist')

  })
})
