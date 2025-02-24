

describe('tasks', () => {
    it('You must register a new task', () => {
        // Variables
        const text = 'Estudar para Cypress';
        // Steps
        cy.removeTaskByName(text)
        cy.createTask(text)
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
        // Steps
        cy.removeTaskByName(task.name)
        cy.apiCreateTask(task)
        cy.createTask(task.name)

        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', duplicity_message)
    });
})
