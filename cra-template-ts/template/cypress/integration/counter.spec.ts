// eslint-disable-next-line
/// <reference types="cypress" />
// @ts-ignore

describe('Counter tests', () => {
  before(() => {
    // start recording HAR
    // @ts-ignore
    cy.recordHar()
  })
  const baseUrl = `https://${Cypress.env('HOST')}:${Cypress.env('APP_PORT')}`
  beforeEach(() => {
    cy.setCookie('authToken', 'token')
    cy.visit(baseUrl)
  })
  it('Test counter', () => {
    cy.contains('Counter component')

    cy.get('[data-qa="counter-value"]').then(async data => {
      const initialCount = parseInt(data.text(), 10)
      cy.get('[data-qa="increment-counter"]').click()
      cy.get('[data-qa="counter-value"]').should('have.text', `${initialCount + 1}`)
      cy.get('[data-qa="increment-counter-async"]').click()
      cy.wait(2000) // eslint-disable-line
      cy.get('[data-qa="counter-value"]').should('have.text', `${initialCount + 2}`)
      cy.get('[data-qa="decrement-counter"]').click()
      cy.get('[data-qa="counter-value"]').should('have.text', `${initialCount + 1}`)
    })

    const text =
      'Here you can increment and decrement counter value using buttons below. All the state updates are performed via redux actions.'
    cy.contains(text)
  })
  after(() => {
    // HAR will be saved as users.spec.har
    // at the root of the project
    // @ts-ignore
    cy.saveHar()
  })
})
