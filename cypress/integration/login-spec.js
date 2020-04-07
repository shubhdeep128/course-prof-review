require('dotenv/config');
process.env.NODE_ENV = "test"
describe('Login', () => {
    it('Testing Admin auth correct creds', ()=>{
        cy.visit('http://localhost:5050/admin/login')
        cy.get('#username')
            .type('testadmin')
        cy.get('#password')
            .type('testadmin')
        cy.get('[data-cy-login-button')
            .click()
            cy.contains('Logout')
    })
    it('Testing Admin auth wrong creds', ()=>{
        cy.visit('http://localhost:5050/admin/login')
        cy.get('#username')
            .type('testadmin')
        cy.get('#password')
            .type('testmin')
        cy.get('[data-cy-login-button')
            .click()
        cy.contains('Login')
    })
    
})