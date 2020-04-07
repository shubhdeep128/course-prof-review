require('dotenv/config')

describe('Course Review Submission', () => {

    it('Testing Course page', ()=>{
        process.env['NODE_ENV'] = "test"
        cy.log(process.env.NODE_ENV)

        cy.visit('http://localhost:3000/course')
        cy.contains('Courses')
        cy.get('#course-title')
            .click()
        cy.get('#desc')
            .type('This is a test Review')
        cy.get('#rating')
            .type('4')
        cy.get('[data-cy-review-button]')
            .click()
        cy.contains('This is a test Review')
            
    })
})