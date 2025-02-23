describe('empty spec', () => {
  it('Webapp must be online', () => {
    cy.visit('http://localhost:3000')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})