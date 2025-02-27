describe('empty spec', () => {
  it('Webapp must be online', () => {
    cy.visit('/')

    cy.title().should('eq', 'Gerencie suas tarefas com Mark L')
  })
})