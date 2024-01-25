/// <reference types="Cypress" />


it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    
    cy.get('#title')
      .should('be.visible')

    cy.get('#white-background')
      .should('contain','Talking About Testing')
  });
