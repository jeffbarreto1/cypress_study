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

Cypress.Commands.add('createTask', (value)=> {
    // Access the page to be tested
    cy.visit('http://localhost:3000')
    // Enter a name for the task in the input
    cy.get('#newTask')
        .type(value)
    // Click on the button that creates the new task
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('removeTaskByName', (value)=> {
    // Clean the test environment before proceeding
    cy.request({
        url: 'http://localhost:3333/helper/tasks',
        method: 'DELETE',
        body: { name: value },
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})

Cypress.Commands.add('apiCreateTask', (value)=> {
    // Pre-register a task via API
    cy.request({
        url: 'http://localhost:3333/tasks',
        method: 'POST',
        body: value,
    }).then(response => {
        expect(response.status).to.eq(201)
    })
})
