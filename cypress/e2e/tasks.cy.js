

describe('tasks', () => {

    context('Register', () => {

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
    
        it('It should not be possible to register an empty task', () => {
            // Variables
            const alert = 'This is a required field';
            // Steps
            cy.createTask()
            cy.isRequired(alert)
        });    

    });
    
    context('Buttons task', () => {

        it('Finish task', () => {
            // Variables
            const task = {
                name: 'Finalizar uma task',
                is_done: false
            }
            // Steps
            cy.removeTaskByName(task.name)
            cy.apiCreateTask(task)
            cy.finishTask(task.name)
        });
        
        it('Delete task', () => {
            // Variables
            const task = {
                name: 'Excluir uma task',
                is_done: false
            }
            // Steps
            cy.removeTaskByName(task.name)
            cy.apiCreateTask(task)
            cy.deleteTask(task.name)
        });
    });

})
