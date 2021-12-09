// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.contains('Blogs')
    })

    it('login form can be opened', function() {
        cy.contains('Login').click()
    })

    it('user can login', function () {
        cy.contains('Login').click()
        cy.get('#username').type('e1800949')
        cy.get('#password').type('12345')
        cy.get('#login-btn').click()

        cy.contains('abc logged-in')
    })  
  })