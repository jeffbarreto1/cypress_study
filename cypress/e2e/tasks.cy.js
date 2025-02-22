

describe('tasks', () => {
    it('Deve cadastrar uma nova tarefa', () => {
        const text = 'Estudar para Cypress'; // Variável reutilizavel
        // Limpa o ambiente de teste antes prosseguir
        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: text },
        }).then(response => {
            expect(response.status).to.eq(204)
        })
        // Acessa a página a ser testada
        cy.visit('http://localhost:3000')
        // Digita um nome para a task no input
        cy.get('#newTask')
            .type(text)
        // Clica no botão que cria a nova task
        cy.contains('button', 'Create').click()
        // Conferir se a task foi adicionada na lista
        cy.contains('main div p', text)
            .should('be.visible')
    });
})
