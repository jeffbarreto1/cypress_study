

describe('tasks', () => {
    it('You must register a new task', () => {
        // Variables
        const text = 'Estudar para Cypress';
        // Clean the test environment before proceeding
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: text },
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        // Access the page to be tested
        cy.visit('http://localhost:3000')
        // Enter a name for the task in the input
        cy.get('#newTask')
            .type(text)
        // Click on the button that creates the new task
        cy.contains('button', 'Create').click()
        // Check if the task has been added to the list
        cy.contains('main div p', text)
            .should('be.visible')
    });
    it('Do not allow duplicate tasks', () => {
        // Variables
        const task = {
            name: 'Estudar JavaScript',
            is_done: false
        }
        const duplicity_message= 'Task already exists!'
        // Clean the test environment before proceeding
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: task.name },
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        // Pre-register a task via API
        cy.request({
            url: 'http://localhost:3333/tasks',
            method: 'POST',
            body: task,
        }).then(response => {
            expect(response.status).to.eq(201)
        })
        // Access the page to be tested
        cy.visit('http://localhost:3000')
        // Enter a name for the task in the input
        cy.get('#newTask')
            .type(task.name)
        // Click on the button that creates the new task
        cy.contains('button', 'Create').click()
        // 
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', duplicity_message)
    });
})
