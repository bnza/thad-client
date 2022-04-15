describe('The auth process', () => {
  it.skip('successfully auth user', () => {
    cy.login('user_base@example.com','0000')
  })

  it('logout works', () => {
    cy.login('user_base@example.com','0000')

    cy.get('[data-cy=auth_btn]').click()
    cy.get('[data-cy=logout_btn]').click()
    cy.get('[data-cy=auth_btn]').within(() => {
      cy.get('i').should('have.class', 'mdi-login')
    })
  })


})
