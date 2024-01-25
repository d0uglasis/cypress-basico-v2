/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function() {
    cy.visit('./src/index.html')
    })
  it('verifica o título da aplicação', function() {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário',function() {
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    
    cy.get('#firstName')
      .type('Douglas', {delay : 0} )
    cy.get('#lastName')
      .type('Santos', {delay : 0} )
    cy.get('#email')
      .type('douglas.uj@gmail.com', {delay : 0} )
    cy.get('#open-text-area')
      .type(longText, {delay : 0} )
    cy.contains('button', 'Enviar')
      .click()
    
    cy.get('.success')
      .should('be.visible')
      .should('contain','sucesso')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function() {
    cy.get('#firstName')
      .type('Douglas', {delay : 0} )
    cy.get('#lastName')
      .type('Santos', {delay : 0} )
    cy.get('#email')
      .type('Douglas.ujgmail.com.br', {delay : 0} )
    cy.get('#open-text-area')
      .type('Teste da atividade do udemy', {delay : 0} )
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')
      .should('contain','obrigatório')
  })

  it('validar preenchimento do telefone com valor não númerico',function() {
    cy.get('#phone')
      .type('douglas')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function() {
    cy.get('#firstName')
      .type('Douglas', {delay : 0} )
    cy.get('#lastName')
      .type('Santos', {delay : 0} )
    cy.get('#email')
      .type('douglas.uj@gmail.com', {delay : 0} )
    cy.get('#phone-checkbox')
      .check()
    cy.get('#open-text-area')
      .type('Teste da atividade do udemy', {delay : 0} )
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')
      .should('contain','obrigatório')   
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone',function() {
    cy.get('#firstName')
      .type('Douglas', {delay : 0,} )
      .should('have.value', 'Douglas')
      .clear()
      .should('have.value' , '')
    cy.get('#lastName')
      .type('Santos', {delay : 0,} )
      .should('have.value', 'Santos')
      .clear()
      .should('have.value' , '')
    cy.get('#email')
      .type('Douglas.ujgmail.com.br', {delay : 0,} )
      .should('have.value', 'Douglas.ujgmail.com.br')
      .clear()
      .should('have.value' , '')
    cy.get('#open-text-area')
      .type('Teste da atividade do udemy de parecer', {delay : 0,} ) 
      .should('have.value', 'Teste da atividade do udemy de parecer')
      .clear()
      .should('have.value' , '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function() {
    cy.contains('button', 'Enviar')
      .click()
    cy.get('.error')
      .should('be.visible')
      .should('contain','obrigatório')
  })

  it('envia o formuário com sucesso usando um comando customizado',function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible').should('contain','sucesso')
  })

  it('seleciona um produto (YouTube) por seu texto',function() {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')  
  })

  it('seleciona um produto (Mentoria) por seu valor (value)',function() {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')  
  })

  it('seleciona um produto (Blog) por seu índice',function() {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')  
  })

  it('marca o tipo de atendimento "Feedback"',function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value' , 'feedback')
  })

  it('marca cada tipo de atendimento',function() {
    cy.get('input[type="radio"]')
      .should('have.length' , 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function ()  {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })    
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  });

})