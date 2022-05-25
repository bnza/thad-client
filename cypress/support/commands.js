// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login')
  cy.get('[data-cy=username]').type(username)
  cy.get('[data-cy=password]').type(password)
  cy.get('[data-cy=submit]').click()
  cy.intercept('/users/me')
  cy.get('[data-cy=logged_user]').should('contain', username)
})

Cypress.Commands.add('programmaticLogin', (username, password) => {
  cy.window()
    .its('$nuxt')
    .then((nuxt) => {
      nuxt.$auth.loginWith('local', { data: {username, password} })
    })
  cy.get('[data-cy=logged_user]')
})

Cypress.Commands.add('snackbarContains', (content) => {
  cy.get('[data-cy=the_snackbar]').within( () => {
    cy.get('.v-snack__wrapper').should('be.visible')
    cy.get('.v-snack__content').contains(content)
  })
})

Cypress.Commands.add('loadFixtures', () => {
  cy.exec(`cd ${Cypress.env('api_compose_path')} && docker-compose exec php bin/console hautelook:fixtures:load --env=dev --quiet`)
})

Cypress.Commands.add('resetMedia', () => {
  cy.exec(`cd ${Cypress.env('api_compose_path')} && docker-compose exec php bin/console app:fixtures:reset-media --env=dev --quiet`)
})
