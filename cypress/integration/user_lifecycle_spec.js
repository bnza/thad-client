describe('The User resource lifecycle', () => {
  beforeEach(() => {
    cy.loadFixtures()
  })
  it ('Base user password change', () => {
    cy.visit('/')

    cy.programmaticLogin('user_base@example.com','0000')

    cy.visit('/app/users/me')

    cy.get('[data-cy=open-dialog-btn]').click()

    cy.get('[data-cy=change-user-password-dialog-card]')

    cy.get('[data-cy=old-password-input-col] input').click().type('a{backspace}')

    cy.get('[data-cy=old-password-input-col] .v-messages__message').invoke('text').should('match',/required/)

    cy.get('[data-cy=old-password-input-col] input').type('0000')

    cy.get('[data-cy=old-password-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=old-password-input-col] input[type=password]')

    cy.get('[data-cy=old-password-input-col] .v-input__append-inner').click()

    cy.get('[data-cy=old-password-input-col] input[type=text]')

    cy.get('[data-cy=password-input-col] input').click().type('a{backspace}')

    cy.get('[data-cy=password-input-col] .v-messages__message').invoke('text').should('match',/required/)

    cy.get('[data-cy=password-input-col] input').type('1234567')

    cy.get('[data-cy=password-input-col] .v-messages__message').invoke('text').should('match',/8 character long/)

    cy.get('[data-cy=password-input-col] input').type('8')

    cy.get('[data-cy=password-input-col] .v-messages__message').invoke('text').should('match',/uppercase/)

    cy.get('[data-cy=password-input-col] input').type('{backspace}A')

    cy.get('[data-cy=password-input-col] .v-messages__message').invoke('text').should('match',/lowercase/)

    cy.get('[data-cy=password-input-col] input').type('{backspace}{backspace}Aa')

    cy.get('[data-cy=password-input-col] .v-messages__message').invoke('text').should('match',/alphanumeric/)

    cy.get('[data-cy=password-input-col] input').type('{backspace}{backspace}{backspace}Aa@')

    cy.get('[data-cy=password-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=password-input-col] input[type=password]')

    cy.get('[data-cy=password-input-col] .v-input__append-inner').click()

    cy.get('[data-cy=password-input-col] input[type=text]')

    cy.get('[data-cy=repeat-password-input-col] input').click().type('a{backspace}')

    cy.get('[data-cy=repeat-password-input-col] .v-messages__message').invoke('text').should('match',/match/)

    cy.get('[data-cy=repeat-password-input-col] input').click().type('a')

    cy.get('[data-cy=repeat-password-input-col] .v-messages__message').invoke('text').should('match',/match/)

    cy.get('[data-cy=repeat-password-input-col] input').click().type('{backspace}12345Aa@')

    cy.get('[data-cy=repeat-password-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=repeat-password-input-col] input[type=password]')

    cy.get('[data-cy=repeat-password-input-col] .v-input__append-inner').click()

    cy.get('[data-cy=repeat-password-input-col] input[type=text]')

    cy.intercept({method: 'patch', path: '**/api/users/*'}).as('usersRequest')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@usersRequest').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=auth-btn]').click()

    cy.intercept({method: 'post', path: '**/api/login'}).as('login')

    cy.programmaticLogin('user_base@example.com','12345Aa@')

    cy.wait('@login').its('response.statusCode').should('eq', 200)

  })

  it ('User resource lifecycle (admin)', () => {
    cy.visit('/')

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.intercept({method: 'get', path: '**/api/users/*'}).as('getUsersRequest')

    cy.visit('/app/users')

    cy.get('[data-cy=collection-users-card]')

    cy.wait('@getUsersRequest')

    cy.get('[data-cy=reset-password-btn].v-btn--disabled')
      .parentsUntil('tbody')
      .last()
      .as('currentUserTR')

    cy.get('@currentUserTR')
      .find('td')
      .eq(1)
      .should('have.text', 'user_admin@example.com')

    cy.get('@currentUserTR')
      .find('[data-cy=resource-read-btn]')
      .should('not.have.class', 'v-btn--disabled')

    cy.get('@currentUserTR')
      .find('[data-cy=resource-update-btn]')
      .should('have.class', 'v-btn--disabled')

    cy.get('@currentUserTR')
      .find('[data-cy=resource-delete-btn]')
      .should('have.class', 'v-btn--disabled')

    cy.get('[data-cy=item-crud-navigation]')
      .first()
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.get('[data-cy=item-user-card] .v-toolbar__title').contains('User')

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=submit-btn]').click()

    cy.get('[data-cy=username-input-col] .v-messages__message').invoke('text').should('match',/required/)

    cy.get('[data-cy=username-input-col] input').click().type('you')

    cy.get('[data-cy=username-input-col] .v-messages__message').invoke('text').should('match',/e-mail/)

    cy.get('[data-cy=username-input-col] input').click().type('@example.com')

    cy.get('[data-cy=username-input-col] .v-messages__message').should('not.exist')

    cy.get('[data-cy=roles-input-col] input').eq(1).parent().click()

    cy.intercept({method: 'post', path: '**/api/users'}).as('createUsers')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@createUsers').its('response.statusCode').should('eq', 201)

    cy.get('[data-cy=item-user-card]')

    cy.wait('@getUsersRequest')

    cy.get('#resetPassword').then(password => {
      cy.wrap(password).invoke('text').as('newPassword')
    });

    cy.get('@newPassword').then(password => {
      cy.intercept({method: 'post', path: '**/api/login'}).as('login')
      cy.programmaticLogin('you@example.com',password)
      cy.wait('@login').its('response.statusCode').should('eq', 200)
    });

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.programmaticRoute('/app/users')

    cy.get('[data-cy=resource-create-btn]').click()

    cy.get('[data-cy=username-input-col] input').click().type('you@example.com')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@createUsers').its('response.statusCode').should('eq', 422)

    cy.get('[data-cy=snackbar-close-btn]').click()

    cy.get('[data-cy=navigation-prev-btn]').click()

    cy.get('[data-cy=resource-update-btn]')
      .last()
      .click()

    cy.get('[data-cy=roles-input-col] input').last().parent().click()

    cy.intercept({method: 'patch', path: '**/api/users/*'}).as('updateUsers')

    cy.get('[data-cy=submit-btn]').click()

    cy.wait('@updateUsers').its('response.statusCode').should('eq', 200)

    cy.get('[data-cy=reset-password-btn]')
      .last()
      .click()

    cy.get('[data-cy=reset-btn]').click()

    cy.get('#resetPassword').then(password => {
      cy.wrap(password).invoke('text').as('resetPassword')
    });

    cy.get('@resetPassword').then(password => {
      cy.intercept({method: 'post', path: '**/api/login'}).as('login')
      cy.programmaticLogin('you@example.com',password)
      cy.wait('@login').its('response.statusCode').should('eq', 200)
    });

    cy.programmaticLogin('user_admin@example.com','0002')

    cy.programmaticRoute('/app/users')

    cy.get('[data-cy=resource-delete-btn]')
      .last()
      .click()

    cy.get('[data-cy=delete-resource-dialog-card]').as('deleteResourceDialogCard')

    cy.get('@deleteResourceDialogCard').should('be.visible')

    cy.intercept({method: 'delete', path: '**/api/users/*'}).as('successfulDeleteRequest')

    cy.get('@deleteResourceDialogCard').find('[data-cy=delete-btn]').click()

    cy.wait('@successfulDeleteRequest').its('response.statusCode').should('eq', 204)

  })
})
