require('dotenv/config')

describe('Course Review Submission', () => {

    it('Testing Course page', ()=>{
        cy.visit('http://localhost:3000/course')
        cy.contains('Courses')
        cy.get('#course-details')
            .click()
        cy.get('#add-review')
            .click({force : true})
        cy.get('#revbody')
            .type('This is a test Review', {force: true})
        cy.get('#rating')
            .type('4',{force: true})
        cy.get('#submit-review')
            .click({force:true})      
        cy.contains('Reviews')
        cy.get('#add-review')
            .click({force : true})
        cy.contains('You have already left a review')
    })
})