describe('The auth process', () => {
  it('successful login/logout', () => {
    cy.login('user_base@example.com','0000')

    cy.get('[data-cy=auth-btn]').click()
    cy.get('[data-cy=logout-btn]').click()
    cy.get('[data-cy=auth-btn]').within(() => {
      cy.get('i').should('have.class', 'mdi-login')
    })

    cy.snackbarContains('User logged out')
  })
})
